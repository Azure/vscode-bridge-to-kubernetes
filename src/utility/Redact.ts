// Please note: This utility function is written as short term usage.
// Key aspect is to redact anything which we should log and is sensitive in nature.
// Long term - we should aim for removing any data which we dont need and only need specific usage.
enum SesitiveInfoFlags {
    ClientSecret = "clientsecret",
}

export function redactJsonObject(obj: any) {
   try {
        obj.message = JSON.stringify(JSON.parse(obj.message), replacer)
        return obj;
   } catch(error) {
        return new Error(`Invalid Json: ${obj}`);
   }
}

function replacer(key: string, value: any) {

    switch (key){
        case SesitiveInfoFlags.ClientSecret:
            return "[REDACTED]";
        default:
            return value
    }
}
