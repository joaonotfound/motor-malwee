
import { makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadOrdersController } from "./load-orders"

const makeSut = () => {
    const idHasher = makeHashIDStub()
    const sut = new LoadOrdersController(idHasher)
    return { sut, idHasher }
}

describe('LoadOrdersController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decoder', async () => {
        const { sut, idHasher } = makeSut()
        const decodeSpy = jest.spyOn(idHasher, 'decode')
        const request: HttpRequest = {
            body: {},
            params: {
                customer: "valid-customer"
            }
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
})