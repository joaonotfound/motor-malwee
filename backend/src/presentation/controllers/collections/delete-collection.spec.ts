import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteCollectionController } from './delete-collection';

const makeSut = () => {
    const sut = new DeleteCollectionController();
    return { sut }
}

describe('DeleteCollectionController', () => {  
    it('should return 400 if no description was provided.', async () => {
        const {sut} = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
})