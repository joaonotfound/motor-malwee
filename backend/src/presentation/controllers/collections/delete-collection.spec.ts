import { ok } from '@/presentation/helpers';
import { createRepositoryStub } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteCollectionController } from './delete-collection';

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteCollectionController(repositoryStub);
    return { sut, repositoryStub, collectionStub }
}

describe('DeleteCollectionController', () => {  
    it('should return 400 if no collection was provided.', async () => {
        const {sut} = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('collection'))
    })

    it('should return invalid param if collection not found ', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'delete').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            body: {
                collection: "invalid-collection"
            }, 
            params: {}
        }
        
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('collection'))
    })

    it('should return 200 if the user was deleted.', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                collection: "valid-collection"
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })
})