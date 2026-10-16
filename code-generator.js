const crypto = require("crypto")

const base64URLEncode = (str) =>
    str
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "")

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest()


module.export = () => {
    const codeVerifier = base64URLEncode(crypto.randomBytes(32))
    const codeChallenge = base64URLEncode(sha256(codeVerifier))
    const state = base64URLEncode(crypto.randomBytes(16))

    return { state, codeVerifier, codeChallenge }
}