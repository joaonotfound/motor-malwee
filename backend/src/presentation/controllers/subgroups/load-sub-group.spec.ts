import { createRepositoryStub, invalidParam, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadSubGroupsController } from "./load-sub-group"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoadSubGroupsController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}
describe('LoadSubGroups', () => {

    it('should return 400 if no group was provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('group'))
    }),

    it('should return 400 if group doesnt exists.', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            params: {
                group: 'invalid-group'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })

})