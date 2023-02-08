import * as assert from 'assert';
import { redactJsonObject } from '../../utility/Redact';

suite('Redact Test', () => {
    test('should return redacted secrets always', async () => {
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

       assert.equal((JSON.parse(result.message)["clientsecret"]).toString(), "[REDACTED]");
    });
});
