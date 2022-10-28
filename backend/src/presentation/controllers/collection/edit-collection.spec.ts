import { createRepositoryStub, invalidParam, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditCollectionController } from "./edit-collection"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new EditCollectionController(repositoryStub)
    return { sut, repositoryStub, collectionStub }    
}
describe('EditCollectionController', () => {
    it('should return 400 if no collection was provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {
                new_collection: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('collection'))
    })
    it('should return 200 if the collection was edited', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            params: {},
            body: {
                collection: "valid-collection",
                new_collection: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ edited: true }))
    })
    it('should return 400 if collection doesnt exist', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            params: {},
            body: {
                collection: 'valid-collection',
                new_collection: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('collection'))
    })
})