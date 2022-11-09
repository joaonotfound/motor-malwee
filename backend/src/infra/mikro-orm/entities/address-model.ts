
import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Address extends BaseEntity {
    @Property()
    customer: number 

    @Property()
    city: string

    @Property()
    state: string

    @Property()
    country: string

    @Property()
    street: string

    @Property()
    district: string

    @Property({ nullable: true })
    reference: string

    @Property({ nullable: true })
    complement: string

    @Property({ nullable: true })
    zip: string

    constructor(params: { customer: number, city: string, state: string, country: string, street: string, district: string, reference: string, complement: string, zip: string, id: number, status: number }) {
        super(params)
        this.customer = params.customer
        this.city = params.city
        this.complement = params.complement
        this.country = params.country
        this.state = params.state
        this.zip = params.zip
        this.reference = params.reference
        this.district = params.district
        this.street = params.street
    }
}