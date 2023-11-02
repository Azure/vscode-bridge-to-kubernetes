// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------

//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: './src/ExtensionHost.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode',
        fsevents: "require('fsevents')", // This is required to load fsevents for chokidar package
            'applicationinsights-native-metrics': 'applicationinsights-native-metrics',
            '@opentelemetry/tracing': '@opentelemetry/tracing',
            '@opentelemetry/instrumentation': '@opentelemetry/instrumentation',
            '@azure/opentelemetry-instrumentation-azure-sdk': '@azure/opentelemetry-instrumentation-azure-sdk',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }
};
module.exports = config;