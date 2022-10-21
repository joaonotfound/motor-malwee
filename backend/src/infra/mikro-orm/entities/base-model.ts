import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number

  @Property()
  status: number

  @Property({ type: String })
  createdAt = new Date();

  @Property({ type: String, onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(params: { id: number, status: number }){
    if(!params.id){
      this.id = 8 // todo: random-id
    } else{
      this.id = params.id
    }
    this.status = params.status ? params.status:  1
  }
}
