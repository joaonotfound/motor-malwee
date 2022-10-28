import { createRepositoryStub, ok } from "@/presentation/helpers"
import { LoadCollectionController } from "./load-collection"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
        
    const sut = new LoadCollectionController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadCollectionsController', () => {
    it('should call find method', async () => {
        const { sut, collectionStub } = makeSut()
        const findSpy = jest.spyOn(collectionStub, 'find')

        await sut.handle()
        expect(findSpy).toHaveBeenCalledWith({})

    })
    it('should return collections', async () => {
        const { sut } = makeSut()       
        const response = await sut.handle()
        expect(response).toEqual(ok({ collections: [] }))        
    })
})