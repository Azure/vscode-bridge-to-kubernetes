import { after, describe, it } from 'mocha';
import { loggerStub } from '../CommonTestObjects';
import { BinariesVersionClient } from '../../clients/BinariesVersionClient';
import { IClientProvider } from '../../clients/Providers/IClientProvider';
import { CommandRunner } from '../../clients/CommandRunner';
import { DotNetClientProvider } from '../../clients/Providers/DotNetClientProvider';

describe('dotNetClientProviderTest', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('should always return dotnet for linux', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedName = 'dotnet';
        import('chai')
            .then(chai => chai.expect('dotnet').to.equal(expectedName))
            .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
    });

    it('should always return dotnet for windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedName = 'dotnet.exe';
        import('chai')
            .then(chai => chai.expect('dotnet.exe').to.equal(expectedName))
            .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
    });

    it('should always return dotnet for darwin', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedName = 'dotnet';
        import('chai')
            .then(chai => chai.expect('dotnet').to.equal(expectedName))
            .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
    });

    it('should return unknown for unknown platform', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        try {
            dotnetClientProvider.getExecutableFilePath();
            import('chai')
                .then(chai => chai.expect.fail('Should have thrown an error'))
                .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
        } catch (error) {
            import('chai')
                .then(chai => chai.expect(error.message).to.equal('Unsupported platform to get dotnetruntime executable path: msdos'))
                .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
        }
    });

    it('should return the download directory name as dotnet', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        import('chai')
            .then(chai => chai.expect(dotnetClientProvider.getDownloadDirectoryName()).to.equal('dotnet'))
            .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const expecteddotnetVersion = '7.0.7';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        import('chai')
            .then(chai => chai.expect(dotnetClientProvider.getExpectedVersion()).to.equal(expecteddotnetVersion))
            .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
})
