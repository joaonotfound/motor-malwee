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
    it('should return 400 if no price is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                description: 'valid-description',
                subgroup: 'valid-subgroup',
                collection: 'valid-collection'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('price'))
    })
    it('should return 400 if no subgroup is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                description: 'valid-description',
                price: 'valid-price',                
                collection: 'valid-collection'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('subgroup'))
    })
    it('should return 400 if no collection is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                description: 'valid-description',
                price: 'valid-price',                
                subgroup: 'valid-subgroup'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('collection'))
    })
})