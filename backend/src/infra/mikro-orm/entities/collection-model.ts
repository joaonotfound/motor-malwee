import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Collection extends BaseEntity{
  @Property()
  description: string

  constructor(params: { description: string, id: number, status: number }){
    super(params)
    this.description = params.description
  }
}