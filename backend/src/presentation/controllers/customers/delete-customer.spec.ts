import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteCustomerController } from './delete-customer';

const makeSut = () => {
    const sut = new DeleteCustomerController()
    return { sut }
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
})