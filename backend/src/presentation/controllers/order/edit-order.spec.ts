import { createRepositoryStub, invalidParam, makeHashIDStub, missingParam } from "@/presentation/helpers"
import { EditOrderController } from "./edit-order"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const encoder = makeHashIDStub()
    const sut = new EditOrderController(repositoryStub, encoder)
    return { sut, repositoryStub, collectionStub, encoder }
}

describe('EditOrderController', () => {
    it('should return 400 if no id is providen', async () => {
        const { sut } = makeSut()
        const request = {
            body: {}, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
    it('should call decoder', async () => {
        const { sut, encoder } = makeSut()
        const encoderSpy = jest.spyOn(encoder, 'decode')        
        const request = {
            body: {
                id: 'invalid-id'
            }, 
            params: {}
        }
        await sut.handle(request)
        expect(encoderSpy).toHaveBeenCalled()
        
    })
    it('should return 400 if invalid id is providen', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const request = {
            body: {
                id: 'invalid-id'
            }, 
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('id'))
    })
})