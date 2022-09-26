// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';
import * as vscode from 'vscode';

import { AccountContextManager } from '../models/context/AccountContextManager';
import { BinariesUtilityV2 } from './BinariesUtilityV2';

export class BinariesManager {
    public static getBinariesUtility(
                                     context: vscode.ExtensionContext,
                                     commandEnvironmentVariables: NodeJS.ProcessEnv,
                                     accountContextManager: AccountContextManager,
                                     
    ) {
        return new BinariesUtilityV2(context, commandEnvironmentVariables, accountContextManager);
    }
}