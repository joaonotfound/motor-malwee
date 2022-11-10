import { createRepositoryStub, invalidParam, makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { EditAddressController } from "./edit-address"

const makeSut = () => {
    const idHasher = makeHashIDStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new EditAddressController(idHasher, repositoryStub)
    return { sut, idHasher, repositoryStub, collectionStub}
}

describe('EditAddressController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decode', async () => {
        const { sut, idHasher } = makeSut()
        const decodeSpy = jest.spyOn(idHasher, 'decode')
        const request: HttpRequest = {
            body: {
                customer: 'valid-customer'
            },
            params: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
    it('should return 400 if invalid customer', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                customer: 'invalid-customer'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('customer'))
    })
})