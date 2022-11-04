
import { Entity, Property, types } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Product extends BaseEntity {
    @Property()
    city: string

    @Property()
    state: string

    @Property()
    country: string

    @Property()
    street: string

    @Property()
    number: number

    @Property()
    reference: string

    @Property()
    complement: string

    @Property()
    zip: string

    constructor(params: { city: string, state: string, country: string, street: string, number: number, reference: string, complement: string, zip: string, id: number, status: number }) {
        super(params)
        this.city = params.city
        this.complement = params.complement
        this.country = params.country
        this.state = params.state
        this.zip = params.zip
        this.reference = params.reference
        this.number = params.number
        this.street = params.street
    }
}