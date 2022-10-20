import { Entity } from "./entities/entity-model";

export interface Collection<T>{ 
    find: ( where: Partial<T> | Partial<Entity> ) => Promise<T[]>
}

export interface Repository {
    collection: <T extends Entity>(entity: T) => Collection<T>
}