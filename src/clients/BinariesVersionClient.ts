// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import { PathOrFileDescriptor } from 'fs';
import { Constants } from '../Constants';
import { Logger } from '../logger/Logger';
import { TelemetryEvent } from '../logger/TelemetryEvent';
import { IBinariesDownloadInfo, IDownloadInfo } from '../models/IBinariesDownloadInfo';
import { fileSystem } from '../utility/FileSystem';
import { RetryUtility } from '../utility/RetryUtility';
import { ClientType } from './ClientType';
import path = require('path');

export class BinariesVersionClient {
    private _binariesDownloadInfoPromise: Promise<IBinariesDownloadInfo>;

    public constructor(
        private readonly _expectedBridgeVersion: string,
        private readonly _logger: Logger
    ) {
        this._binariesDownloadInfoPromise = null;
    }

    public async getCachedBinariesDownloadInfoAsync(): Promise<IBinariesDownloadInfo> {
        if (this._binariesDownloadInfoPromise == null) {
            this._binariesDownloadInfoPromise = this.getBinariesDownloadInfoAsync();
            this._binariesDownloadInfoPromise.then(() => {
                this._logger.trace(TelemetryEvent.BinariesVersionClient_GetCachedBinariesDownloadInfoSuccess);
            }).catch(error => {
                this._binariesDownloadInfoPromise = null;
                this._logger.error(TelemetryEvent.BinariesVersionClient_GetCachedBinariesDownloadInfoError, error);
            });
        }

        return this._binariesDownloadInfoPromise;
    }

    private async getBinariesDownloadInfoAsync(): Promise<IBinariesDownloadInfo> {
        let downloadSucceeded = false;

        try {
            const getDownloadInfoAsyncFn = async (): Promise<IBinariesDownloadInfo> => {

                // Get latest download URL and checksum
                const binaryVersionsJson: any = this.getBinariesJsonContent();
                const osString: string = this.getOsString();
                const version: string = binaryVersionsJson[`version`];
                const binariesDownloadInfo: object = binaryVersionsJson[osString];

                const binariesDownloadInfoMap: Map<ClientType, IDownloadInfo> = new Map<ClientType, IDownloadInfo>();
                binariesDownloadInfoMap.set(ClientType.Bridge, this.getDownloadInfo(ClientType.Bridge, binariesDownloadInfo));
                binariesDownloadInfoMap.set(ClientType.Kubectl, this.getDownloadInfo(ClientType.Kubectl, binariesDownloadInfo));
                binariesDownloadInfoMap.set(ClientType.DotNet, this.getDownloadInfo(ClientType.DotNet, binariesDownloadInfo));

                downloadSucceeded = true;
                this._logger.trace(TelemetryEvent.BinariesVersionClient_GetDownloadInfoSuccess, {
                    bridgeAvailableVersion: version,
                    bridgeExpectedVersion: this._expectedBridgeVersion,
                    dotNetExpectedVersion: Constants.DotNetMinVersion,
                    kubectlExpectedVersion: Constants.KubectlMinVersion
                });

                return {
                    downloadInfoMap: binariesDownloadInfoMap
                };
            };
            return await RetryUtility.retryAsync<IBinariesDownloadInfo>(getDownloadInfoAsyncFn, /*retries*/3, /*delayInMs*/100);
        }
        catch (error) {
            this._logger.error(TelemetryEvent.BinariesVersionClient_GetDownloadInfoError, error);
            throw error;
        }
    }

    private getDownloadInfo(client: ClientType, binariesDownloadInfo: object): IDownloadInfo {
        return {
            downloadUrl: binariesDownloadInfo[client][`url`],
            sha256Hash: binariesDownloadInfo[client][`sha256Hash`]
        };
    }

    private getOsString(): string {
        switch (process.platform) {
            case `win32`:
                return process.arch && process.arch === 'arm64' ? `win_arm64` : `win`;
            case `darwin`:
                return process.arch && process.arch === 'arm64' ? `osx_arm64` : `osx`;
            case `linux`:
                return process.arch && process.arch === 'arm64' ? `linux_arm64` : `linux`;
            default:
                const error = new Error(`Unsupported platform: ${process.platform}`);
                this._logger.error(TelemetryEvent.UnexpectedError, error);
                throw error;
        }
    }

    private async getBinariesJsonContent() {
        let jsonContent: any;
        let filePath: PathOrFileDescriptor;
        try {
            filePath = path.join(__dirname, '..', 'utility', 'BinaryDownloadInfo.json');
            const rawContent: string = await fileSystem.readFileAsync(filePath, `utf8`);
            jsonContent = JSON.parse(rawContent);
            if (jsonContent == null) {
                throw new Error(`Parsing the BinariesDownloadInfo.json file at path ${filePath} returned null`);
            }
        }
        catch (error) {
            const userFriendlyError = new Error(`Failed to retrieve the BinariesDownloadInfo.json file at path ${filePath}. Error: ${error.message}`);
            this._logger.error(TelemetryEvent.UnexpectedError, userFriendlyError);
            throw userFriendlyError;
        }
        return jsonContent;
    }
}