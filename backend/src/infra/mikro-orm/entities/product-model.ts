import { Entity, Property, types } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Product extends BaseEntity{
  @Property()
  description: string

  @Property({ type: types.double })
  price: number

  @Property()
  fk_subgroup: string
  
  @Property()
  fk_collection: string 

  constructor(params: { description: string, price: number, fk_subgroup: string, fk_collection: string, id: number, status: number }){
    super(params)
    this.fk_collection = params.fk_collection
    this.fk_subgroup = params.fk_subgroup
    this.price = params.price
    this.description = params.description
  }
}