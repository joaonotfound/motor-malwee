import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadSubGroupsController } from "./load-sub-group"

const makeSut = () => {
    const sut = new LoadSubGroupsController()
    return { sut }
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
    })
})