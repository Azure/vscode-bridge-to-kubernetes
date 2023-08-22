import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { FileLogWriter } from "../../logger/FileLogWriter";
import { Logger } from "../../logger/Logger";
import Sinon = require("sinon");


describe('Logger Test', () => {
    let logger: Logger;
    let stub;
    beforeEach(async() => {
        stub = Sinon.createStubInstance(FileLogWriter);
        logger = new Logger(stub, `Common Extension Root`);
    });

    it('should work for trace method', async () => {
        logger.trace('test');
        //expect(stub.write).to.have.been.with('test');
    });
});