import { Entity } from "./entity-model";

export class OrderItemEntity extends Entity {
    constructor(
        public order: number,
        public product: number,
        public quantity: number,
        public unitPrice: number, 
        public totalPrice: number,
    ) { super() }
}

export const orderItemEntity = new OrderItemEntity(0, 0, 0, 0, 0)