import { Entity, Collection, Repository } from "@/domain"

class CollectionStub implements Collection<any> {
    async find(_: Partial<Entity> | Partial<any>): Promise<any> {
        return ''
    }
    async findOne(_: Partial<Entity> | Partial<any>): Promise<any> {
        return ''
    }
    async update(_: any): Promise<void> { }
    async save(_: any): Promise<void> { }
}
    
class RepositoryStub implements Repository {
    collection(_: any){ return new CollectionStub() }    
}

export function createRepositoryStub() {
    return new RepositoryStub()
}