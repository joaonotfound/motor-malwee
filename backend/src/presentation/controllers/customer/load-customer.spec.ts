import { missingParam } from "@/presentation/helpers"
import { LoadCustomerController } from "./load-customer"

const makeSut = () => {
    const sut = new LoadCustomerController()
    return { sut }
}

describe('LoadCustomerController', () => {
    it('should return 400 if no cpnj was providen', async () => {
        const { sut } = makeSut()
        const request = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('cpnj'))
    })
})