// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';
import * as vscode from 'vscode';

import { Constants } from '../Constants';
import { Logger } from '../logger/Logger';
import { TelemetryEvent } from '../logger/TelemetryEvent';
import { AccountContextManager } from '../models/context/AccountContextManager';
import { BinariesUtilityV2 } from './BinariesUtilityV2';
import { IBinariesUtility } from './IBinariesUtility';

export class BinariesManager {
    public static getBinariesUtility(logger: Logger,
                                     context: vscode.ExtensionContext,
                                     commandEnvironmentVariables: NodeJS.ProcessEnv,
                                     accountContextManager: AccountContextManager,
                                     expectedCLIVersion: string
    ): IBinariesUtility {
        if (this.useBinariesUtility()) {
            logger.trace(TelemetryEvent.BinariesUtility_Version);
            return new BinariesUtilityV2(logger, context, commandEnvironmentVariables, accountContextManager, expectedCLIVersion);
        }
    }

    private static useBinariesUtility(): boolean {
        const userMachineID: string = vscode.env.machineId;
        if (userMachineID == null || userMachineID === `someValue.machineId`) {
            return true;
        }

        for (const firstCharacter of Constants.FirstCharacterOfMachineIDToUseBinariesUtilityV2) {
            if (userMachineID.startsWith(firstCharacter)) {
                return true;
            }
        }

        return true;
    }
}