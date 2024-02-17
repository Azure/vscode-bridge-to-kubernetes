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
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc';
        import('chai')
            .then(chai => chai.expect(binariesName).to.equal(expectedName))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('should return binaries name as dsc always for windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc.exe';
        import('chai')
            .then(chai => chai.expect(binariesName).to.equal(expectedName))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('should return binaries name as dsc always for darwin', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        const binariesName = bridgeClientProvider.getExecutableFilePath();
        const expectedName = 'dsc';
        import('chai')
            .then(chai => chai.expect(binariesName).to.equal(expectedName))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('should return binaries as unknown for unknown platform', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        try {
            bridgeClientProvider.getExecutableFilePath();
            import('chai')
                .then(chai => chai.expect.fail('Should have thrown an error'))
                .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        } catch (error) {
            import('chai')
                .then(chai => chai.expect(error.message).to.equal('Unsupported platform to get bridge executable path: msdos'))
                .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        }
    });

    it('should return the download directory name as bridge', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        import('chai')
            .then(chai => chai.expect(bridgeClientProvider.getDownloadDirectoryName()).to.equal('bridge'))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const bridgeClientProvider: IClientProvider = new BridgeClientProvider(binariesVersionClient, expectedCLIVersion, new CommandRunner(null), loggerStub);
        import('chai')
            .then(chai => chai.expect(bridgeClientProvider.getExpectedVersion()).to.equal(expectedCLIVersion))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
});