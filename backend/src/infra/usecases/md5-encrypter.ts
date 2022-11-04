import { Encrypter } from "@/domain";
const md5 = require('md5')

export class MD5Encrypter implements Encrypter {
    async encrypt(text: string): Promise<string> {
        return md5(text)
    }
}