import { createRepositoryStub } from "@/presentation/helpers"
import { LoadGroupsController } from "./load-groups"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
        
    const sut = new LoadGroupsController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadGroupController', () => {
    it('should call find method', async () => {
        const { sut, collectionStub } = makeSut()
        const findSpy = jest.spyOn(collectionStub, 'find')

        await sut.handle()
        expect(findSpy).toHaveBeenCalledWith({})

    })
})