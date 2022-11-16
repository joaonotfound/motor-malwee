import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteOrderController } from "./delete-order"

const makeSut = () => {
    const sut = new DeleteOrderController()
    return { sut }
}

describe('DeleteOrderController', () => {
    it('should return 400 if no id is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
})