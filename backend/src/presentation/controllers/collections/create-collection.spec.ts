import { alreadyInUse, missingParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { CreateCollectionController } from "./create-collection";
import { createRepositoryStub } from "@/presentation/helpers";

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateCollectionController(repositoryStub);
    return { sut, repositoryStub, collectionStub }

}
describe('CreateCollectionController', () => {
    it('should return 400 if no description is provided. ', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
    it('should return 400 if the collection already exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)

        const request: HttpRequest = {
            body: {
                description: "Already-in-use-description"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('description'))
    })
    it('should create the collection',async () => {
        const { sut, collectionStub } = makeSut()
        const saveSpy = jest.spyOn(collectionStub, 'save')

        const request: HttpRequest = {
            body: {
                description: "valid-description"
            },
            params: {}
        }
        
        await sut.handle(request)
        expect(saveSpy).toHaveBeenCalledWith({ description: 'valid-description' })        
    })
    it('should return 200 if the collection was created', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                description: "valid-description"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ created: true }))
    })
})