import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { EntityRepository } from "@mikro-orm/mysql";

import { Entity, Repository, Collection  } from "@/domain"
import { mikroHelper } from '@/infra'
import { BaseEntity } from "../mikro-orm/entities"


class MikroCollection<T extends Entity> implements Collection<T> {
    constructor(
        private readonly repository: EntityRepository<any>,
        private readonly ormEntity: any
    ){}
    
    private safeWhere(where: any){
        return Object.assign({}, where, { status: 1 })
    }
    async update(entity: T){
        const ormEntity = new this.ormEntity(entity)
        await this.repository.nativeUpdate({ id: ormEntity.id }, ormEntity)
    }
    async save(entity: T): Promise<T> {        
        const ormEntity = new this.ormEntity(entity)
        await this.repository.persistAndFlush(ormEntity)
        return ormEntity
    }

    async findOne(where: Partial<Entity> | Partial<T>): Promise<T>{
        return await this.repository.findOne(this.safeWhere(where))
    }
    
    async find(where: Partial<Entity> | Partial<T>): Promise<T[]>{
        return await this.repository.find(this.safeWhere(where))
    }

    async deactivate(where: Partial<Entity>): Promise<T | undefined> {
        const entity = await this.findOne(where)
        if(!entity){
            return
        }
        entity.status = 0
        await this.repository.nativeUpdate({ id: entity.id }, entity)
        return entity
    }
}

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

    public ensureSchema() {
        mikroHelper.ensureSchema()
    }

    public static async create(entities: Zip): Promise<MikroRepository>{
        const em = await mikroHelper.getEm()
        return new MikroRepository(em, entities)
    }
    
    private findOrmEntity<T extends Entity>(entity: T) {
        return this.entities.find( zip => entity.constructor == zip.value.constructor )?.ormEntity
    }

    async execute(query: string) {
        return await this.em.getConnection().execute(query)
    }

    collection<T extends Entity>(entity: T): Collection<T> {
        const ormEntity = this.findOrmEntity(entity)
        const collection = new MikroCollection<T>(this.em.getRepository(ormEntity), ormEntity)
        return collection
    }
}