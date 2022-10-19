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

  constructor(username: string, email: string, password: string){
    super()
    this.username = username
    this.email = email
    this.password = password
  }
}