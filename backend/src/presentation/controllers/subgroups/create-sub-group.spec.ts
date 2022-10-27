import { createRepositoryStub, invalidParam, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateSubGroupController } from "./create-sub-group"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateSubGroupController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('CreateSubGroupController', () => {
    it('should return 400 if no description is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                group: 'valid-group'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
    it('should return 400 if no group is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                description: 'valid-description'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('group'))
    })
    it('should return 400 if group doesnt exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            body: {
                group: 'invalid-group',
                description: 'valid-description'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })
})