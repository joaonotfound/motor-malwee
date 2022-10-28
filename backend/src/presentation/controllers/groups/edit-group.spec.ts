import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditGroupController } from "./edit-group"

const makeSut = () => {
    const sut = new EditGroupController()
    return { sut }    
}
describe('EditGroupController', () => {
    it('should return 400 if no description was provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
})