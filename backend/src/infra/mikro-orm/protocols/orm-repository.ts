import { Repository } from '@/data/repository'
import { EntityRepository } from '@mikro-orm/core'

export class OrmRepository implements Repository {

  constructor( private readonly em: any ){}

  public collection(entity: any): EntityRepository<any>{
      return this.em.getRepository(entity)
  }
}