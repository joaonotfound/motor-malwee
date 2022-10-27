import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class SubGroup extends BaseEntity{
  @Property()
  description: string

  @Property()
  fk_group: number

  constructor(params: { description: string, fk_group: number, id: number, status: number }){
    super(params)
    this.description = params.description
    this.fk_group = params.fk_group
  }
}