// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';

import {
    runTests
} from '@vscode/test-electron';
import * as path from 'path';

async function main(): Promise<void> {
    try {
        // The folder containing the Extension Manifest package.json.
        const extensionDevelopmentPath: string = path.resolve(__dirname, `../../`);

        // The path to the extension test script.
        const extensionTestsPath: string = path.resolve(__dirname, `./suites/index`);

        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath
        });
    }
    catch (error) {
        console.error(error);
        console.error(`Failed to run tests`);
        process.exit(1);
    }
}

main();