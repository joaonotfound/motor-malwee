import { Entity, Collection, Repository } from "@/domain"

class CollectionStub implements Collection<any> {
    async find(_: Partial<Entity> | Partial<any>): Promise<any> {
        return []
    }
    async findOne(_: Partial<Entity> | Partial<any>): Promise<any> {
        return ''
    }
    async update(_: any): Promise<void> { }
    async save(_: any): Promise<void> { }
}
    
class RepositoryStub implements Repository {
    constructor(private _collection: Collection<any>){}
    collection(_: any){ return this._collection }    
}

export function createRepositoryStub() {
    const collectionStub = new CollectionStub()
    const repositoryStub = new RepositoryStub(collectionStub)
    return { collectionStub, repositoryStub }
}