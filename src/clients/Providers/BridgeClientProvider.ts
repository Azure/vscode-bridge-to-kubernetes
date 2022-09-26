// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import * as path from 'path';

import { Constants } from "../../Constants";
import { Logger } from "../../logger/Logger";
import { BridgeClient } from "../BridgeClient";
import { ClientType } from "../ClientType";
import { CommandRunner } from "../CommandRunner";
import { IClient } from "../IClient";
import { IClientProvider } from "./IClientProvider";

export class BridgeClientProvider implements IClientProvider {

    public constructor(
        private readonly _commandRunner: CommandRunner,
        private readonly _logger: Logger
    ) { }

    public Type: ClientType = ClientType.Bridge;

    public getExecutableFilePath(): string {
        const binariesName = `bridge`;

        switch (process.platform) {
        case `win32`:
            return binariesName + `.exe`;
        case `darwin`:
        case `linux`:
            return binariesName;
        default:
            const error = new Error(`Unsupported platform to get ${this.Type} executable path: ${process.platform}`);
            throw error;
        }
    }

    public getDownloadDirectoryName(): string {
        return Constants.BridgeDownloadDirectoryName;
    }

    public getClient(executablePath: string, dotNetPath: string): IClient {
        return new BridgeClient(dotNetPath, executablePath, this._commandRunner, this._logger);
    }

    public getLocalBuildExecutablePath(): string {
        if (process.env.BRIDGE_BUILD_PATH != null) {
            return path.join(process.env.BRIDGE_BUILD_PATH, this.getExecutableFilePath());
        }

        return null;
    }

    public getExecutablesToUpdatePermissions(): string[] {
        return [ this.getExecutableFilePath(), path.join(`EndpointManager`, `EndpointManager`) ];
    }
}