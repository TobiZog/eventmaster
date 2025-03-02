import { createCipheriv, randomBytes } from "crypto"


export function encryptString(value: string): string {
  // Defining algorithm
    const algorithm = 'aes-256-cbc';

    // Defining key
    const key = Buffer.from(
      [
        0xa, 0xc, 0xc, 0x0, 0xf, 0xf, 0xa, 0x6,
        0x4, 0xe, 0xc, 0x5, 0x0, 0xe, 0xa, 0xa,
        0x1, 0x3, 0x7, 0xf, 0xf, 0x7, 0x8, 0x4,
        0xd, 0xf, 0x3, 0x9, 0xc, 0x2, 0xc, 0xc
      ]
    )

    // Defining iv
    const iv = Buffer.from(
      [
        0xb, 0xd, 0x6, 0x6, 0xa, 0x5, 0xf, 0xa, 0x6, 0xb, 0xe, 0x4, 0x3, 0xa, 0x9, 0x2
      ]
    )

    let cipher = createCipheriv(algorithm, Buffer.from(key), iv);

    // let cipher = createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(value)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString("hex")
}