import { expect } from "chai";
import { describe, it } from "mocha";
import { AccountContextManager } from "../../models/context/AccountContextManager";
import { loggerStub } from "../CommonTestObjects";

describe('AccountContextManagerTest', () => {
    it('should return kube config path', async() => {
        let accountContextManager: AccountContextManager = new AccountContextManager(loggerStub);
        const result = await accountContextManager.getKubeconfigPathAsync();
        expect(result).not.to.be.null;
    });
});