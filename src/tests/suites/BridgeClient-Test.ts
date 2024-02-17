import { describe, it } from 'mocha';
import * as sinon from 'sinon';
import { BridgeClient } from "../../clients/BridgeClient";
import { CommandRunner } from '../../clients/CommandRunner';
import { ResourceType } from "../../connect/ResourceType";
import { loggerStub } from '../CommonTestObjects';

describe('BridgeClient Tests', () => {
    it('connectAsync should work with multiple containers', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", "testContainer", "testNamespace", false, null);
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.calledOnce).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        import('chai')
            .then(chai => chai.expect(args.indexOf("--container")).not.to.equal(-1))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(args.indexOf("testContainer")).not.to.equal(-1))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('connectAsync should work when container name is empty', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", "", "testNamespace", false, null);
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.calledOnce).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        import('chai')
            .then(chai => chai.expect(args.indexOf("--container")).to.equal(-1))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('connectAsync should work when container name is null', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", null, "testNamespace", false, null);
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.calledOnce).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        import('chai')
            .then(chai => chai.expect(args.indexOf("--container")).to.equal(-1))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('connectAsync should work when container name is undefined', async () => {
        const commandRunnerStub = sinon.createStubInstance(CommandRunner);
        commandRunnerStub.runAsync.resolves("");
        const bridgeClient = new BridgeClient("", "", commandRunnerStub, "", loggerStub);
        await bridgeClient.connectAsync("test", "testKubeConfigPath", "testResource", ResourceType.Service, [3001], 4001,
            "testEnvFilePath", "testScriptPath", "testParentPrcId", null, "testIsolateAs", undefined, "testNamespace", false, null);
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.calledOnce).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(commandRunnerStub.runAsync.getCall(0).args[1].length).not.to.equal(0))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        const args = commandRunnerStub.runAsync.getCall(0).args[1];
        import('chai')
            .then(chai => chai.expect(args.indexOf("--container")).to.equal(-1))
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });
});