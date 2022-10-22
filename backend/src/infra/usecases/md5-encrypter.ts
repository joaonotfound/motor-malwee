import { Encrypter } from "@/domain";
import * as md5 from 'md5'

export class MD5Encrypter implements Encrypter {
    async encrypt(text: string): Promise<string> {
        return md5(text)
    }
}