import { createRepositoryStub, makeHashIDStub, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteAddressController } from "./delete-address"

const makeSut = () => {
    const hasherStub = makeHashIDStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new DeleteAddressController(hasherStub, repositoryStub)
    return { sut, repositoryStub, collectionStub, hasherStub }
}
describe('DeleteAddressController', () => {
    it('should return 400 if no id is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
    it('should call decode method', async () => {
        const { sut, hasherStub } = makeSut()
        const decodeSpy = jest.spyOn(hasherStub, 'decode')
        const request: HttpRequest = { 
            params: {
                id: 'valid-id'
            },
            body: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-id')
    })
    it('should return 200 if no errors', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            params: {
                id: 'valid-id'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ deleted: true }))
    })
})