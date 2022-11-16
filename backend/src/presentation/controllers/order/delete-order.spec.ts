import { createRepositoryStub, makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteOrderController } from "./delete-order"

const makeSut = () => {
    const encoder = makeHashIDStub()
    const { repositoryStub } = createRepositoryStub()
    const sut = new DeleteOrderController(encoder, repositoryStub)
    return { sut, encoder }
}

describe('DeleteOrderController', () => {
    it('should return 400 if no id is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
    it('should call decoder', async () => {
        const { sut, encoder } = makeSut()
        const decodeSpy = jest.spyOn(encoder, 'decode')
        const request: HttpRequest = {
            body: {},
            params: {
                id: 'valid-id'
            }
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-id')
    })
})