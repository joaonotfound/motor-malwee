import { Entity, Property } from '@mikro-orm/core'
import { BaseEntity } from "./base-model";

@Entity()
export class User extends BaseEntity{
  @Property()
  username: string
  
  @Property()
  email: string
  
  @Property()
  password: string

  constructor(params: { username: string, email: string, password: string, id: number, status: number }){
    super(params)
    this.username = params.username
    this.email = params.email
    this.password = params.password
  }
}