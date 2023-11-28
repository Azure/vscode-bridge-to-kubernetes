import { expect } from 'chai';
import { after, describe, it } from 'mocha';
import * as process from 'process';
import sinon = require('sinon');
import { CommandRunner } from '../../clients/CommandRunner';
import { IClientProvider } from '../../clients/Providers/IClientProvider';
import { accountContextManagerStub, loggerStub } from '../CommonTestObjects';
import { BinariesVersionClient } from '../../clients/BinariesVersionClient';
import { KubectlClientProvider } from '../../clients/Providers/KubectlClientProvider';
import { Constants } from '../../Constants';

describe('KubectlClientProviderTest', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('should always return linux/kubectl for linux', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'linux'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        const kubectlName = kubectlClientProvide.getExecutableFilePath();
        const expectedName = 'linux/kubectl';
        expect(kubectlName).to.equal(expectedName);
    });

    it('should always return win/kubectl for windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        const kubectlName = kubectlClientProvide.getExecutableFilePath();
        const expectedName = 'win/kubectl.exe';
        expect(kubectlName).to.equal(expectedName);
    });

    it('should always return osx/kubectl for darwin', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        const kubectlName = kubectlClientProvide.getExecutableFilePath();
        const expectedName = 'osx/kubectl';
        expect(kubectlName).to.equal(expectedName);
    });

    it('should return unknown for unknown platform', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'msdos'
        });
        const expectedCLIVersion = '1.0.20220816.2';
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        try {
            kubectlClientProvide.getExecutableFilePath();
            expect.fail('Should have thrown an error');
        } catch (error) {
            expect(error.message).to.equal('Unsupported platform to get kubectl executable path: msdos');
        }
    });

    it('should return the download directory name as kubectl', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        expect(kubectlClientProvide.getDownloadDirectoryName()).to.equal('kubectl');
    });

    it('should return expected version', async () => {
        const expectedCLIVersion = '1.0.20220816.2';
        const expectedkubectlVersion = Constants.KubectlMinVersion;
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves(null);
        const binariesVersionClient: BinariesVersionClient = new BinariesVersionClient(expectedCLIVersion, null);
        const kubectlClientProvide: IClientProvider = new KubectlClientProvider(binariesVersionClient, commandRunnerStub, accountContextManagerStub, loggerStub)
        expect(kubectlClientProvide.getExpectedVersion()).to.equal(expectedkubectlVersion);
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
})