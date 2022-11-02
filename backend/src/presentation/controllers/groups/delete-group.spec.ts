import { ok } from '@/presentation/helpers';
import { createRepositoryStub } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { missingParam } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { DeleteGroupController } from './delete-group';

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteGroupController(repositoryStub);
    return { sut, repositoryStub, collectionStub }
}

describe('DeleteGroupController', () => {  
    it('should return 400 if no group was provided.', async () => {
        const {sut} = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('group'))
    })

    it('should return invalid param if group not found ', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'deactivate').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            body: {
                group: "invalid-group"
            }, 
            params: {}
        }
        
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('group'))
    })

    it('should return 200 if the group was deleted.', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                group: "valid-group"
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })
})