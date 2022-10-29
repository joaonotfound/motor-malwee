import { Entity } from "./entity-model";

export class CustomerEntity extends Entity {
    constructor(
        public popularName: string,
        public CPNJ: string,
        public companyName: string
    ) { super() }
}

export const customerEntity = new CustomerEntity('', '', '')