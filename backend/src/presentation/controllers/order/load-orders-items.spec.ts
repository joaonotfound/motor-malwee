import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadOrdersItemsController } from "./load-orders-items"

const makeSut = () => {
    const sut = new LoadOrdersItemsController()
    return { sut }
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
})