import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Order extends BaseEntity {
    @Property()
    customer: number

    @Property()
    address: number    

    constructor(params: { customer: number, address: number, product: number, quantity: number, id: number, status: number }) {
        super(params)
        this.customer = params.customer
        this.address = params.address
    }
}