import { makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadAddressController } from "./load-address"

const makeSut = () => {
    const hashIdStub = makeHashIDStub()
    const sut = new LoadAddressController(hashIdStub)
    return { sut, hashIdStub }
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
    })
    it('should call decode method', async () => {
        const { sut, hashIdStub } = makeSut()
        const decodeSpy = jest.spyOn(hashIdStub, 'decode')
        const request: HttpRequest = {
            params: {
                user: 'valid-user'
            },
            body: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-user')
    })
})