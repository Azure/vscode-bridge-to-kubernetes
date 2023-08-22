import { expect } from 'chai';
import { after, describe, it } from 'mocha';
import { loggerStub } from '../CommonTestObjects';
import { BinariesVersionClient } from '../../clients/BinariesVersionClient';
import { IClientProvider } from '../../clients/Providers/IClientProvider';
import { CommandRunner } from '../../clients/CommandRunner';
import { DotNetClientProvider } from '../../clients/Providers/DotNetClientProvider';

describe('dotNetClientProviderTest', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('should always return dotnet for linux', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedName = 'dotnet';
        expect('dotnet').to.equal(expectedName);
    });

    it('should always return dotnet for windows', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedName = 'dotnet.exe';
        expect('dotnet.exe').to.equal(expectedName);
    });

    it('should always return dotnet for darwin', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedName = 'dotnet';
        expect('dotnet').to.equal(expectedName);
    });

    it('should return unknown for unknown platform', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        try {
            dotnetClientProvider.getExecutableFilePath();
            expect.fail('Should have thrown an error');
        } catch (error) {
            expect(error.message).to.equal('Unsupported platform to get dotnetruntime executable path: msdos');
        }
    });

    it('should return the download directory name as dotnet', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        expect(dotnetClientProvider.getDownloadDirectoryName()).to.equal('dotnet');
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const expecteddotnetVersion = '7.0.7';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const dotnetClientProvider: IClientProvider = new DotNetClientProvider(binariesVersionClient, new CommandRunner(null), loggerStub);
        expect(dotnetClientProvider.getExpectedVersion()).to.equal(expecteddotnetVersion);
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
})
