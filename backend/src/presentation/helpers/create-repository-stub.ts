import { Entity, Collection, Repository } from "@/domain"

class CollectionStub implements Collection<any> {
    async find(_: Partial<Entity> | Partial<any>): Promise<any> {
        return []
    }
    async findOne(_: Partial<Entity> | Partial<any>): Promise<any> {
        return false
    }
    async update(_: any): Promise<void> { }
    async save(_: any): Promise<void> { }
    async deactivate(_: any): Promise<any>{
        return true
     }
}
    
class RepositoryStub implements Repository {
    constructor(private _collection: Collection<any>) { }
    collection(_: any) { return this._collection }
    async execute(_: string) { return [] }
}

export function createRepositoryStub() {
    const collectionStub = new CollectionStub()
    const repositoryStub = new RepositoryStub(collectionStub)
    return { collectionStub, repositoryStub }
}