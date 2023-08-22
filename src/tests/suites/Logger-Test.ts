import { assert, expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { FileLogWriter } from "../../logger/FileLogWriter";
import { Logger } from "../../logger/Logger";
import sinon = require("sinon");
import { TelemetryEvent } from "../../logger/TelemetryEvent";
import { Telemetry } from "telaug";



describe('Logger Test', () => {
    let logger: Logger;
    let stub, spy;
    beforeEach(async() => {
        spy = sinon.spy(FileLogWriter);
        stub = sinon.createStubInstance(FileLogWriter); 
        logger = new Logger(stub, `Common Extension Root`);
    });

    it('should work for trace method', async () => {
        logger.trace('test');
        expect(stub.write.called).to.be.true;
        expect(stub.write.args[0][0].includes('test')).to.be.true;
        expect(stub.write.args[0][0].includes('TRACE')).to.be.true;
    });

    it('should work for warning method', async () => {
        logger.warning('test');
        expect(stub.write.called).to.be.true;
        expect(stub.write.args[0][0].includes('test')).to.be.true;
        expect(stub.write.args[0][0].includes('WARNG')).to.be.true;
    });
});