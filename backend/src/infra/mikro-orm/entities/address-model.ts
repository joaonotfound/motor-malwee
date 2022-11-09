
import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Product extends BaseEntity {
    @Property()
    user: number 

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

    @Property()
    reference: string

    @Property()
    complement: string

    @Property()
    zip: string

    constructor(params: { user: number, city: string, state: string, country: string, street: string, district: string, reference: string, complement: string, zip: string, id: number, status: number }) {
        super(params)
        this.user = params.user
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