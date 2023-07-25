// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main(): Promise<void> {
    try {
        // The folder containing the Extension Manifest package.json.
        const extensionDevelopmentPath: string = path.resolve(__dirname, `../../`);

        // The path to the extension test script.
        const extensionTestsPath: string = path.resolve(__dirname, `./TestsRunner`);

        await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
		});
    }
    catch (error) {
        // tslint:disable-next-line: no-console
        console.error(`Failed to run tests`, error);
        process.exit(1);
    }
}

main();