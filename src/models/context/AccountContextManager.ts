// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import * as FileSystemWatcher from 'chokidar';
import * as vscode from 'vscode';
import * as k8s from 'vscode-kubernetes-tools-api';

import { Logger } from '../../logger/Logger';
import { TelemetryEvent } from '../../logger/TelemetryEvent';
import { EventSource, IReadOnlyEventSource } from '../../utility/Event';
import * as k8sClient from '@kubernetes/client-node'; 

export class AccountContextManager {
    private _currentKubeconfigPath: string;
    private _fsWatcher: FileSystemWatcher.FSWatcher;
    private _kubeconfigChanged: EventSource<void>;

    public constructor(
        private readonly _logger: Logger) {
            this._kubeconfigChanged = new EventSource<void>();
    }

    public async getK8sClient(): Promise<k8sClient.CoreV1Api> {
        const kc = new k8sClient.KubeConfig();
        const kubeconfigPath = await this.getKubeconfigPathAsync();
        kc.loadFromFile(kubeconfigPath);
        return kc.makeApiClient(k8sClient.CoreV1Api);
    }

    public async getKubeconfigPathAsync(shouldDisplayErrorIfNeeded: boolean = true): Promise<string> {
        try {
            const kubectlConfig = await k8s.extension.configuration.v1;
            if (!kubectlConfig.available) {
                throw new Error(`The API to get the kubeconfig path from the Kubernetes extension is not available`);
            }

            const kubeConfigPathResult: k8s.ConfigurationV1.KubeconfigPath = kubectlConfig.api.getKubeconfigPath();
            if (kubeConfigPathResult.pathType === `wsl`) {
                throw new Error(`WSL is currently not supported`);
            }

            if (kubeConfigPathResult.hostPath !== this._currentKubeconfigPath) {
                const oldKubeconfigPath = this._currentKubeconfigPath;
                this._currentKubeconfigPath = kubeConfigPathResult.hostPath;
                if (this._fsWatcher == null) {
                    this._fsWatcher = FileSystemWatcher.watch(this._currentKubeconfigPath);
                }
                else {
                    this._fsWatcher.unwatch(oldKubeconfigPath);
                    this._fsWatcher.add(this._currentKubeconfigPath);
                }
            }
            // The kubeconfig file is watched for changes, and the event is triggered when the file is changed.
            this._fsWatcher.on(`change`, (path) => {
                this._kubeconfigChanged.trigger()
            });

            return this._currentKubeconfigPath;
        }
        catch (error) {
            this._logger.error(TelemetryEvent.AccountContextManager_GetKubeconfigPathError, error);
            if (shouldDisplayErrorIfNeeded) {
                vscode.window.showErrorMessage(`Failed to get the current kubeconfig path. Error: ${error.message}`);
            }
            throw error;
        }
    }

    public getKubeconfigChanged(): IReadOnlyEventSource<void> {
        return this._kubeconfigChanged;
    }
}