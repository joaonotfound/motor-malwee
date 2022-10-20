import { Entity } from "@/data/entities/entity-model";
import { Repository } from "@/data/repository";
import { Collection } from "@/data/repository";
import { BaseEntity } from "./entities";
import { mikroHelper } from '@/infra/mikro-orm/helpers/mikro-helper'
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { EntityRepository } from "@mikro-orm/mysql";

class MikroCollection<T> implements Collection<T> {
    constructor(
        private readonly repository: EntityRepository<any>
    ){}
    
    async find(where: Partial<Entity> | Partial<T>): Promise<T[]>{
        return await this.repository.find(where)
}}

interface JoinEntities<T extends Entity, Q extends BaseEntity>{
    value: T,
    ormEntity: Q
}

export type Zip = Array<JoinEntities<any, any>>

export class MikroRepository implements Repository{
    
    constructor( 
        private em: EntityManager<IDatabaseDriver<Connection>>,
        private readonly entities: Zip
    ){ }

    public static async create(entities: Zip): Promise<MikroRepository>{
        const em = await mikroHelper.getEm()
        return new MikroRepository(em, entities)
    }

    collection<T extends Entity>(entity: T): Collection<T> {
        console.log(entity, this.entities)
        // todo: fix error, right-hand side of instanceof is not callable
        const found = this.entities.find( zip => entity instanceof zip.value )
        const collection = new MikroCollection<T>(this.em.getRepository(found?.ormEntity!))
        return collection
    }
}