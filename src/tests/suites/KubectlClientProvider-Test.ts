import { expect } from 'chai';
import { after, describe, it } from 'mocha';
import * as process from 'process';
import { CommandRunner } from '../../clients/CommandRunner';
import { IClientProvider } from '../../clients/Providers/IClientProvider';
import { loggerStub } from '../CommonTestObjects';
import { BinariesVersionClient } from '../../clients/BinariesVersionClient';
import { KubectlClientProvider } from '../../clients/Providers/KubectlClientProvider';
import { AccountContextManager } from '../../models/context/AccountContextManager';

describe('KubectlClientProviderTest', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('should always return linux/kubectl for linux', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedName = 'linux/kubectl';
        expect('linux/kubectl').to.equal(expectedName);
    });

    it('should always return win/kubectl for windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedName = 'win/kubectl.exe';
        expect('win/kubectl.exe').to.equal(expectedName);
    });

    it('should always return osx/kubectl for darwin', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedName = 'osx/kubectl';
        expect('osx/kubectl').to.equal(expectedName);
    });

    it('should return unknown for unknown platform', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, new CommandRunner(null), new AccountContextManager(null), loggerStub)
        try {
            kubectlClientProvide.getExecutableFilePath();
            expect.fail('Should have thrown an error');
        } catch (error) {
            expect(error.message).to.equal('Unsupported platform to get kubectl executable path: msdos');
        }
    });

    it('should return the download directory name as kubectl', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, new CommandRunner(null), new AccountContextManager(null), loggerStub)
        expect(kubectlClientProvide.getDownloadDirectoryName()).to.equal('kubectl');
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const expectedkubectlVersion = '1.21.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, new CommandRunner(null), new AccountContextManager(null), loggerStub)
        expect(kubectlClientProvide.getExpectedVersion()).to.equal(expectedkubectlVersion);
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
})