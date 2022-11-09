import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadAddressController } from "./load-address"

const makeSut = () => {
    const sut = new LoadAddressController()
    return { sut }
}

describe('LoadAddressController', () => {
    it('should return 400 if no user is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('user'))
    } )
})