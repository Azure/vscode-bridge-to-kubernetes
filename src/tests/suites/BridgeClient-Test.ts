import { expect } from "chai";
import { describe, it, after } from 'mocha';
import * as sinon from 'sinon';
import { BridgeClient } from "../../clients/BridgeClient";
import { CommandRunner } from '../../clients/CommandRunner';
import { ResourceType } from "../../connect/ResourceType";
import { loggerStub } from '../CommonTestObjects';
import { fileSystem } from "../../utility/FileSystem";

describe('BridgeClient Tests', () => {
    const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
    it('connectAsync should work with multiple containers', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", "testContainer", "testNamespace", false, null);
        expect(commandRunnerStub.runAsync.calledOnce).to.be.true;
        expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0);
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        expect(args.indexOf("--container")).not.to.equal(-1);
        expect(args.indexOf("testContainer")).not.to.equal(-1);
    });

    it('connectAsync should work when container name is empty', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", "", "testNamespace", false, null);
        expect(commandRunnerStub.runAsync.calledOnce).to.be.true;
        expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0);
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        expect(args.indexOf("--container")).to.equal(-1);
    });

    it('connectAsync should work when container name is null', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", null, "testNamespace", false, null);
        expect(commandRunnerStub.runAsync.calledOnce).to.be.true;
        expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0);
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        expect(args.indexOf("--container")).to.equal(-1);
    });

    it('connectAsync should work when container name is undefined', async () => {
        loggerStub.trace.reset();
        loggerStub.trace.onCall(0).returns();
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", undefined, "testNamespace", false, null);
        expect(commandRunnerStub.runAsync.calledOnce).to.be.true;
        expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0);
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        expect(args.indexOf("--container")).to.equal(-1);
    });

    it('versionAsync should work', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("1.0.20231212");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        const output = await bridgeClient.getVersionAsync();
        expect(commandRunnerStub.runAsync.calledOnce).to.be.true;
        expect(output).to.equal("1.0.20231212");
    });

    it('versionAsync should work when it is arm64 mac', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("1.0.20231212");
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });
        Object.defineProperty(process, 'arch', {
            value: 'arm64'
        });
        const fileSystemStub = sinon.stub(fileSystem, 'existsAsync');
        fileSystemStub.resolves(true);
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        const output = await bridgeClient.getVersionAsync();
        expect(commandRunnerStub.runAsync.calledTwice).to.be.true;
        const args = commandRunnerStub.runAsync.getCall(0).args[0];
        expect(args.indexOf("/usr/bin/codesign")).to.equal(0);
        expect(output).to.equal("1.0.20231212");
    });

    it('versionAsync should work when it is arm64 mac and it is already signed', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        const args: string[] = ['-s', '-', ''];
        commandRunnerStub.runAsync.withArgs("/usr/bin/codesign", args, null, null).rejects(new Error("is already signed"));
        commandRunnerStub.runAsync.resolves("1.0.20231212");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        const output = await bridgeClient.getVersionAsync();
        expect(commandRunnerStub.runAsync.callCount).to.equal(3);
        const expectedArgs = commandRunnerStub.runAsync.getCall(0).args[0];
        expect(expectedArgs.indexOf("/usr/bin/codesign")).to.equal(0);
        expect(output).to.equal("1.0.20231212");
    });

    after(() => {
        Object.defineProperty(process, 'platform', originalPlatform);
    });
});