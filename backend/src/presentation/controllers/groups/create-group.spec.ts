import { alreadyInUse, missingParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { CreateGroupController } from "./create-group";
import { createRepositoryStub } from "@/presentation/helpers";

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateGroupController(repositoryStub);
    return { sut, repositoryStub, collectionStub }

}
describe('Create Group', () => {
    it('should return 400 if no description is provided. ', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
    it('should return 400 if the group already exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)

        const request: HttpRequest = {
            body: {
                description: "Already-in-use-username"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('description'))
    })
    it('should create the group',async () => {
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
    it('should return 200 if the group was created', async () => {
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