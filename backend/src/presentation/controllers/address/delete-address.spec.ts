import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteAddressController } from "./delete-address"

const makeSut = () => {
    const sut = new DeleteAddressController()
    return { sut }
}
describe('DeleteAddressController', () => {
    it('should return 400 if no id is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
})