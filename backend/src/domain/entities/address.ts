import { Entity } from "./entity-model";

export class Address extends Entity {
    constructor(
        public user: number,
        public city: string,
        public state: string,
        public country: string,
        public street: string,
        public district: string,
        public reference: string,
        public complement: string,
        public zip: string
    ) { super() }
}

export const addressEntity = new Address(0, '', '' ,'', '', '', '', '', '')