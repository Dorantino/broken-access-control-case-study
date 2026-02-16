import crypto from "crypto";

const SECRET = "super_secret_key_change_this";

export function createSession(username: string) {
    const signature = crypto
        .createHmac("sha256", SECRET)
        .update(username)
        .digest("hex");

    return `${username}.${signature}`;
}

export function verifySession(sessionValue: string) {
    const [username, signature] = sessionValue.split(".");

    if (!username || !signature) return null;

    const expectedSignature = crypto
        .createHmac("sha256", SECRET)
        .update(username)
        .digest("hex");

    if (signature !== expectedSignature) return null;

    return username;
}
