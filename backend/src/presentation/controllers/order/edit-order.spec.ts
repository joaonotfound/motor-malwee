import { missingParam } from "@/presentation/helpers"
import { EditOrderController } from "./edit-order"

const makeSut = () => {
    const sut = new EditOrderController()
    return { sut }
}

describe('EditOrderController', () => {
    it('should return 400 if no id is providen', async () => {
        const { sut } = makeSut()
        const request = {
            body: {}, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
})