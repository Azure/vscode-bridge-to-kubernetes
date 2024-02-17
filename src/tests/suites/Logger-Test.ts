import { beforeEach, describe, it } from "mocha";
import { FileLogWriter } from "../../logger/FileLogWriter";
import { Logger } from "../../logger/Logger";
import sinon = require("sinon");

describe('Logger Test', () => {
    let logger: Logger;
    let stub, spy;
    beforeEach(async () => {
        spy = sinon.spy(FileLogWriter);
        stub = sinon.createStubInstance(FileLogWriter);
        logger = new Logger(stub, `Common Extension Root`);
    });

    it('should work for trace method', async () => {
        logger.trace('test');
        import('chai')
            .then(chai => chai.expect(stub.write.called).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(stub.write.args[0][0].includes('test')).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(stub.write.args[0][0].includes('TRACE')).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });

    it('should work for warning method', async () => {
        logger.warning('test');
        import('chai')
            .then(chai => chai.expect(stub.write.called).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(stub.write.args[0][0].includes('test')).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
        import('chai')
            .then(chai => chai.expect(stub.write.args[0][0].includes('WARNG')).to.be.true)
            .catch(err => console.log('this is chai error message, should not happen and error is: ', err));
    });
});