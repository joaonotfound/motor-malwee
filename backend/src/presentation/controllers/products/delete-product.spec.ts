import { ok } from '@/presentation/helpers';
import { createRepositoryStub } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteProductController } from './delete-product';

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteProductController(repositoryStub);
    return { sut, repositoryStub, collectionStub }
}

describe('DeleteProductController', () => {  
    it('should return 400 if no product was provided.', async () => {
        const {sut} = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('product'))
    })

    it('should return invalid param if product not found ', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'deactivate').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            body: {
                product: "invalid-product"
            }, 
            params: {}
        }
        
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('product'))
    })

    it('should return 200 if the product was deleted.', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                product: "valid-product"
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })
})