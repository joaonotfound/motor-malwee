import { makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditAddressController } from "./edit-address"

const makeSut = () => {
    const idHasher = makeHashIDStub()
    const sut = new EditAddressController(idHasher)
    return { sut, idHasher }
}

describe('EditAddressController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decode', async () => {
        const { sut, idHasher } = makeSut()
        const decodeSpy = jest.spyOn(idHasher, 'decode')
        const request: HttpRequest = {
            body: {
                customer: 'valid-customer'
            },
            params: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
})