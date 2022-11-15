import { makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadOrdersItemsController } from "./load-orders-items"

const makeSut = () => {
    const encoder = makeHashIDStub()
    const sut = new LoadOrdersItemsController(encoder)
    return { sut, encoder }
}

describe('LoadOrdersItemsController', () => {
    it('should return 400 if no order id is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
    it('should call decoder', async () => {
        const { sut, encoder } = makeSut()
        const decodeSpy = jest.spyOn(encoder, 'decode')

        const request: HttpRequest = { 
            body: {},
            params: {
                id: 'valid-id'
            }
        }

        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalled()
    })
})