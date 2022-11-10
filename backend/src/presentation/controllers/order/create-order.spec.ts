import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateOrderController } from "./create-order"

const makeSut = () => {
    const sut = new CreateOrderController()
    return { sut }
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
})