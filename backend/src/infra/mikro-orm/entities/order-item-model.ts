import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class OrderItem extends BaseEntity {

    @Property()
    order: number

    @Property()
    product: number

    @Property()
    quantity: number    

    @Property()
    unitPrice: number

    @Property()
    totalPrice: number

    constructor(params: { order: number, unitPrice: number, totalPrice: number, product: number, quantity: number, id: number, status: number }) {
        super(params)
        this.order = params.order
        this.unitPrice = params.unitPrice
        this.totalPrice = params.totalPrice
        this.product = params.product
        this.quantity = params.quantity
    }
}