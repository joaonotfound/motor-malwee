import { ok } from '@/presentation/helpers';
import { createRepositoryStub } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteCustomerController } from './delete-customer';

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteCustomerController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('DeleteCustomerController', () => {
    it('should return 400 if no CPNJ is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should return invalid param if customer not found', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'deactivate').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            body: {
                customer: 'invalid-customer'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('customer'))
    })
    it('should return 200 if customer was deleted', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                customer: 'valid-CPNJ'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })

    
})