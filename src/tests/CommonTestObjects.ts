// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import * as vscode from 'vscode';
import * as sinon from 'sinon';

import { Logger } from '../logger/Logger';
import { AccountContextManager } from '../models/context/AccountContextManager';

export const accountContextManagerMock = sinon.stub(AccountContextManager);
export const loggerMock = sinon.stub(Logger);
export const defaultWorkspaceFolder: vscode.WorkspaceFolder = { index: 0, name: `mywebapi`, uri: vscode.Uri.parse(`file://C:/projects/mywebapi`) };