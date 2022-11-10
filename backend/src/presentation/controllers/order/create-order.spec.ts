import { makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateOrderController } from "./create-order"

const makeSut = () => {
    const hasherId = makeHashIDStub()
    const sut = new CreateOrderController(hasherId)
    return { sut, hasherId }
}

describe('CreateOrderController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should return 400 if no adddress is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                customer: 'valid-customer'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('address'))
    })
    it('should call decoder', async () => {
        const { sut, hasherId } = makeSut()
        const decodeSpy = jest.spyOn(hasherId, 'decode')
        const request: HttpRequest = {
            body: { 
                customer: 'valid-customer',
                address: 'valid-address'
            },
            params: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
})