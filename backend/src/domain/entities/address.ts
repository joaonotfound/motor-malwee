import { Entity } from "./entity-model";

export class Address extends Entity {
    constructor(
        public city: string,
        public state: string,
        public country: string,
        public street: string,
        public number: string,
        public reference: string,
        public complement: string,
        public zip: string
    ) { super() }
}

export const addressEntity = new Address('', '', '', '', '', '', '', '')