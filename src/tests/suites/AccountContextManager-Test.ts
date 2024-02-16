import { describe, it } from "mocha";
import { AccountContextManager } from "../../models/context/AccountContextManager";
import { loggerStub } from "../CommonTestObjects";

describe('AccountContextManagerTest', () => {
    it('should return kube config path', async () => {
        let accountContextManager: AccountContextManager = new AccountContextManager(loggerStub);
        try {
            const result = await accountContextManager.getKubeconfigPathAsync();
            // this happens when debugging tests when k8s extension is installed.
            import('chai')
                .then(chai => chai.expect(result).not.to.be.null)
                .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
        } catch (error) {
            // this will happen if k8s extension is not installed during CI/CD
            import('chai')
                .then(chai => chai.expect(error.message).to.be.equal('The API to get the kubeconfig path from the Kubernetes extension is not available'))
                .catch(chai => chai.expect.fail('this is chai error message, should not happen'));
        }
    });
});