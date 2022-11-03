import { createRepositoryStub, invalidParam, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteSubgroupController } from "./delete-sub-group"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteSubgroupController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('DeleteSubgroupController', () => {
    it('should return 400 if no description was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                group: "valid-group"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
    it('should return 400 if no group was providen', async () => {
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
                description: 'valid-description',
                group: 'valid-group'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })
    it('should return 400 if subgroup doesnt exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        jest.spyOn(collectionStub, 'deactivate').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            body: {
                description: 'valid-description',
                group: 'valid-group'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('description'))
    })
    it('should return 200 is subgroup was deleted.', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        jest.spyOn(collectionStub, 'deactivate').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            body: {
                description: 'valid-description',
                group: 'valid-group'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })
})

    