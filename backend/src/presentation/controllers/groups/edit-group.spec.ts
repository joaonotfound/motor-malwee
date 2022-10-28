import { createRepositoryStub, invalidParam, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditGroupController } from "./edit-group"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new EditGroupController(repositoryStub)
    return { sut, repositoryStub, collectionStub }    
}
describe('EditGroupController', () => {
    it('should return 400 if no group was provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {
                new_group: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('group'))
    })
    it('should return 200 if the group was edited', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            params: {},
            body: {
                group: "valid-group",
                new_group: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ edited: true }))
    })
    it('should return 400 if  group doesnt exist', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            params: {},
            body: {
                group: 'valid-group',
                new_group: {}
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })
})