import { createRepositoryStub, invalidParam, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateProductController } from "./create-product"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateProductController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('CreteProductController', () => {
    it('should return 400 if no description is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                price: 'valid-price',
                group: 'valid-group',
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
                group: 'valid-group',
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
                group: 'valid-group',
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
                group: 'valid-group',
                subgroup: 'valid-subgroup'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('collection'))
    })
    it('should return 400 if no group is providen', async () => {
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
        expect(response).toEqual(missingParam('group'))
    })
    it('should return 400 if group doesnt exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            body: {
                description: 'valid-description',
                price: 'valid-price',
                group: 'invalid-group',
                subgroup: 'valid-subgroup',
                collection: 'valid-collection'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })
    it('should return 400 if subgroup doesnt exists', async () => {

        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementationOnce(
            async ( params: any ) => params.description == 'invalid-subgroup' ? false : true )

        const request: HttpRequest = {
            body: {
                description: 'valid-description',
                price: 'valid-price',
                group: 'valid-group',
                subgroup: 'invalid-subgroup',
                collection: 'valid-collection'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('subgroup'))
    })
    it('should return 400 if collection doesnt exists', async () => {
        
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementation (
            async ( params: any ) => params.description == 'invalid-collection' ? false : true )
            
        const request: HttpRequest = {
            body: {
                description: 'valid-description',
                price: 'valid-price',
                group: 'valid-group',
                subgroup: 'valid-subgroup',
                collection: 'invalid-collection'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('collection'))
    })

    it('should return 400 if product already exists.', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementation(
            async ( params: any ) => params.description == 'invalid-description' ? true : true )

        const request: HttpRequest = {
            body: { 
                description: 'invalid-description',
                price: 'valid-price',                
                group: 'valid-group',
                subgroup: 'valid-subgroup',
                collection: 'valid-collection'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('description'))
    })
})