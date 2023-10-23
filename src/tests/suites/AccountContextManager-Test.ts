import { expect } from "chai";
import { describe, it } from "mocha";
import { AccountContextManager } from "../../models/context/AccountContextManager";
import { loggerStub } from "../CommonTestObjects";

describe('AccountContextManagerTest', () => {
    it('should return kube config path', async() => {
        let accountContextManager: AccountContextManager = new AccountContextManager(loggerStub);
        try {
            const result = await accountContextManager.getKubeconfigPathAsync();
            // this happens when debugging tests when k8s extension is installed.
            expect(result).not.to.be.null;
        } catch(error) {
            // this will happen if k8s extension is not installed during CI/CD
            expect(error.message).to.be.equal('The API to get the kubeconfig path from the Kubernetes extension is not available');
        }
    });
});