import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateProductController } from "./create-product"

const makeSut = () => {
    const sut = new CreateProductController()
    return { sut }
}

describe('CreteProductController', () => {
    it('should return 400 if no description is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                price: 'valid-price',
                subgroup: 'valid-subgroup',
                collection: 'valid-collection'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
})