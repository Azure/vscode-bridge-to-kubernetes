// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------
'use strict';
import * as vscode from 'vscode';

export class VersionUtility {
    // Returns true if 'currentVersion' is greater than or equal to 'minVersion', otherwise false
    // When allowLocalBuildFormat is set to true, skips the validation when third part of the version is '0'. By default this value is false
    // When strict is set to true, only returns true if the version is strictly equal.
    public static isVersionSufficient(currentVersion: string, minVersion: string, allowLocalBuildFormat: boolean = false, strict: boolean = false): boolean {
            const versionArray: string[] = currentVersion.split(`.`);

            // Handle local builds where third part of the version is 0.
            if ((versionArray[2] === `0` || versionArray[2].indexOf(`-`) > -1) && allowLocalBuildFormat) {
                return true;
            }

            const minVersionArray: string[] = minVersion.split(`.`);
            if (versionArray.length !== minVersionArray.length) {
                throw new Error(`Invalid version format: ${currentVersion}`);
            }

            for (let i = 0; i < versionArray.length; ++i) {
                const isIntegerPositive: boolean = /^\d+$/.test(versionArray[i]);
                if (!isIntegerPositive) {
                    throw new Error(`Invalid version: ${currentVersion}`);
                }

                const versionPart: number = Number(versionArray[i]);
                const minVersionPart: number = Number(minVersionArray[i]);

                if (!strict && versionPart > minVersionPart) {
                    return true;
                }

                if (versionPart === minVersionPart) {
                    continue;
                }

                return false;
            }

            return true;
    }

    // Returns the CLI version that this VSCode session expects
    public static async getExpectedCliVersionAsync(packageJsonContent: object): Promise<string> {
        // How we resolve the expected CLI version:
        //  1. Is the BRIDGE_CLI_VERSION environment variable set? Use that one.
        //  2. If BRIDGE_CLI_VERSION is not set, use the version specified in package_Json (irrespective of the env - dev/prod)
        //  3. If bridge build path is not set to null, then expected CLI version will be null
        const packageJsonVersion: string = packageJsonContent[`extensionMetadata`][`expectedCLIVersion`];
        const expectedCLIVersion = process.env.BRIDGE_CLI_VERSION != null ? process.env.BRIDGE_CLI_VERSION :
            (process.env.BRIDGE_BUILD_PATH != null || process.env.BRIDGE_BUILD_PATH != undefined ? null : packageJsonVersion);

        return expectedCLIVersion;
    }
}