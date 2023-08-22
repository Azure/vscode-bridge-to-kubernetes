import * as assert from 'assert';
import { redactJsonObject } from '../../utility/Redact';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Redact Test', () => {
    it('should return redacted secrets always', async () => {
        const error = new Error(`
        {
            "username": "tatsat",
            "password": "hhGu38gf",
            "extra": {
                "id": 1,
                "token": "some-secret-stuff",
                "card": "1234 1234 1234 1234",
                "clientsecret": "987987987978y9asidgiaudiuqw9e87987qwjeqijei"
            },
            "clientsecret": "987987987978y9asidgiaudiuqw9e87987qwjeqijei"
        }
        `);

        const result = redactJsonObject(error);
       expect(JSON.parse(result.message)["extra"]["clientsecret"]).to.equal("[REDACTED]");
       expect(JSON.parse(result.message)["clientsecret"]).to.equal("[REDACTED]");
    });
    it('should return invalid json error when supplied with malformed json', async () => {
        const error = new Error(`
        {
            "username": "tatsat",
            "password": "hhGu38gf",
            "extra": {
                "id": 1,
                "token": "some-secret-stuff",
                card: "1234 1234 1234 1234"
                "clientsecret": "987987987978y9asidgiaudiuqw9e87987qwjeqijei"
            },
            "clientsecret": "987987987978y9asidgiaudiuqw9e87987qwjeqijei"
        }
        `);
        // Lets make sure json is invalid - since above json is malformed it should fail hence - false
        assert.equal(isJsonString(error.message), false);

        // Now lets test the Invalid Json Erro when incorrect json is fed into the funct.
        const result = redactJsonObject(error);
        const containsInvalidJson = result.message.toString().includes("Invalid Json");
        expect(containsInvalidJson).to.be.true;
    });
});

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}