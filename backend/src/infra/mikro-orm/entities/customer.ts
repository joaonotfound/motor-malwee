import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class Customer extends BaseEntity{
  @Property()
  popularName: string

  @Property()
  CPNJ: string

  @Property()
  companyName: string

  constructor(params: { popularName: string, CPNJ: string, companyName: string, id: number, status: number }){
    super(params)
    this.popularName = params.popularName
    this.CPNJ = params.CPNJ
    this.companyName = params.companyName
  }
}