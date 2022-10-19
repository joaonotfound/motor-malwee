import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ type: String })
  createdAt = new Date();

  @Property({ type: String, onUpdate: () => new Date() })
  updatedAt = new Date();

}
