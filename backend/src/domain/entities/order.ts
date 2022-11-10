import { Entity } from "./entity-model";

export class OrderEntity extends Entity {
    constructor(
        public customer: number,
        public address: number
    ) { super() }
}

export const orderEntity = new OrderEntity(0, 0)