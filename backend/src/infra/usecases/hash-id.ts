import { HashID } from "@/domain";
import hash from 'hashids'

export class HashIDs implements HashID {
    hasher;
    constructor( private readonly sault: string = 'the-most-security-sault-ever' ){
        this.hasher = new hash(this.sault)
    }
    encode(value: number): string {
        return this.hasher.encode(value)
    }
    decode(value: string): number {
        return this.hasher.decode(value)[0] as number
    }
}