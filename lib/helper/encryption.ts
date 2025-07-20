const ALG = "aes_256-cbc";
import crypto from "crypto";


export const symmetricEncrypt = (data: string) => {
    const key = process.env.ENCRYPTION_KEY;
    if(!key) throw new Error("encryption key not found")

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALG, Buffer.from(key,  "hex"), iv)
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export const symmetricDecrypt = (encrypted: string) => {
    
}