// add custom key regex
var redactConstants = require('@medikura/redact-secrets/constants')
var customRedact = require('@medikura/redact-secrets')({ keys: [ /clientsecret/, ...redactConstants.KEYS ] })

export function redactJsonObject(obj: any) {
    var jsonString = JSON.stringify(obj);

    if (isJsonString(jsonString)) {
        obj = customRedact.map(jsonString);
        return obj;
    }
}

function isJsonString(jsonString) {
    try {
        JSON.parse(jsonString);
    } catch (e) {
        return false;
    }
    return true;
}