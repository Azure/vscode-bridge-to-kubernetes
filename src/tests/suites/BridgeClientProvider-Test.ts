import { expect } from 'chai';
import { after, describe, it } from 'mocha';
import * as process from 'process';
import { BinariesVersionClient } from '../../clients/BinariesVersionClient';
import { CommandRunner } from '../../clients/CommandRunner';
import { BridgeClientProvider } from '../../clients/Providers/BridgeClientProvider';
import { IClientProvider } from '../../clients/Providers/IClientProvider';
import { loggerStub } from '../CommonTestObjects';
describe('BridgeClientProviderTest', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('should return binaries name as dsc always for linux', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc';
        expect(binariesName).to.equal(expectedName);
    });

    it('should return binaries name as dsc always for windows', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc.exe';
        expect(binariesName).to.equal(expectedName);
    });

    it('should return binaries name as dsc always for darwin', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc';
        expect(binariesName).to.equal(expectedName);
    });

    it('should return binaries as unknown for unknown platform', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        try {
            bridgeClientProvider.getExecutableFilePath();
            expect.fail('Should have thrown an error');
        } catch (error) {
            expect(error.message).to.equal('Unsupported platform to get bridge executable path: msdos');
        }
    });

    it('should return the download directory name as bridge', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        expect(bridgeClientProvider.getDownloadDirectoryName()).to.equal('bridge');
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        expect(bridgeClientProvider.getExpectedVersion()).to.equal(expectedCLIVersion);
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
});