import { createRepositoryStub, makeHashIDStub, ok } from "@/presentation/helpers"
import { LoadGroupsController } from "./load-groups"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const encoderStub = makeHashIDStub()
    const sut = new LoadGroupsController(repositoryStub, encoderStub)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadGroupController', () => {
    it('should call find method', async () => {
        const { sut, collectionStub } = makeSut()
        const findSpy = jest.spyOn(collectionStub, 'find')

        await sut.handle()
        expect(findSpy).toHaveBeenCalledWith({})

    })
    it('should return groups', async () => {
        const { sut } = makeSut()       

        const response = await sut.handle()
        expect(response).toEqual(ok({ groups: [] }))        
    })
})