// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import * as vscode from 'vscode';

import { Logger } from '../logger/Logger';
import { AccountContextManager } from '../models/context/AccountContextManager';
import Sinon = require('sinon');


export const accountContextManagerStub = Sinon.createStubInstance(AccountContextManager);
export const loggerStub = Sinon.createStubInstance(Logger);
export const defaultWorkspaceFolder: vscode.WorkspaceFolder = { index: 0, name: `mywebapi`, uri: vscode.Uri.parse(`file://C:/projects/mywebapi`) };