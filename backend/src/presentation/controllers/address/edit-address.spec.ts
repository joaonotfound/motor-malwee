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
    it('should call decode', async () => {
        const { sut, idHasher } = makeSut()
        const decodeSpy = jest.spyOn(idHasher, 'decode')
        const request: HttpRequest = {
            body: {
                customer: 'valid-customer',
                id: 'valid-id'
            },
            params: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-id')
    })
    it('should return 400 if invalid id', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValue(false)

        const request: HttpRequest = {
            body: {
                customer: 'valid-customer',
                id: 'invalid-id'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('id'))
    })
    it('should return 400 if no id is providen', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            body: {
                customer: 'valid-customer'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
})