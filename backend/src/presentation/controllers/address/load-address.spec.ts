import { createRepositoryStub, invalidParam, makeHashIDStub, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadAddressController } from "./load-address"

const makeSut = () => {
    const hashIdStub = makeHashIDStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoadAddressController(hashIdStub, repositoryStub)
    return { sut, hashIdStub, repositoryStub, collectionStub }
}

describe('LoadAddressController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {},
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decode method', async () => {
        const { sut, hashIdStub } = makeSut()
        const decodeSpy = jest.spyOn(hashIdStub, 'decode')
        const request: HttpRequest = {
            params: {
                customer: 'valid-customer'
            },
            body: {}
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
    it('should return invalidParam if invalid customer', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            params: {
                customer: 'invalid-customer'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('customer'))
    })
    it('should return list of address', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        const request: HttpRequest = {
            params: {
                customer: 'valid-customer'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ addresses: []}))
    })
})