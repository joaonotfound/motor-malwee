import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { EntityRepository } from "@mikro-orm/mysql";

import { Entity, Repository, Collection  } from "@/domain"
import { mikroHelper } from '@/infra'
import { BaseEntity } from "../entities"


class MikroCollection<T extends Entity> implements Collection<T> {
    constructor(
        private readonly repository: EntityRepository<any>,
        private readonly ormEntity: any
    ){}

    async update(entity: T){
        const ormEntity = new this.ormEntity(entity)
        await this.repository.nativeUpdate({ id: ormEntity.id }, ormEntity)
    }

    async save(entity: T){        
        const ormEntity = new this.ormEntity(entity)
        await this.repository.persistAndFlush(ormEntity)
    }

    async findOne(where: Partial<Entity> | Partial<T>): Promise<T>{
        return await this.repository.findOne(where)
    }
    
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

    private findOrmEntity<T extends Entity>(entity: T) {
        return this.entities.find( zip => entity.constructor == zip.value.constructor )?.ormEntity
    }

    collection<T extends Entity>(entity: T): Collection<T> {
        const ormEntity = this.findOrmEntity(entity)
        const collection = new MikroCollection<T>(this.em.getRepository(ormEntity), ormEntity)
        return collection
    }
}