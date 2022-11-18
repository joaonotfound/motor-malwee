import { createRepositoryStub, invalidParam, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditSubGroupController } from "./edit-subgroup"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new EditSubGroupController(repositoryStub)
    return { sut, repositoryStub, collectionStub }    
}
describe('EditSubGroupController', () => {
    it('should return 400 if no subgroup was provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('subgroup'))
    })
    it('should return 200 if the subgroup was edited', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            params: {},
            body: {
                subgroup: "valid-group"
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ edited: true }))
    })
    it('should return 400 if subgroup doesnt exist', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            params: {},
            body: {
                subgroup: 'invalid-group',
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('subgroup'))
    })
})