import { Entity } from "../entities";

export interface Collection<T>{ 
    find( where: Partial<T> | Partial<Entity> ): Promise<T[]>
    findOne( where: Partial<T> | Partial<Entity> ): Promise<T>
    update( entity: T ): Promise<void>
    save( entity: T ): Promise<void>
}

export interface Repository {
    collection: <T extends Entity>(entity: T) => Collection<T>
}