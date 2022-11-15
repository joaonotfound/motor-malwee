
import { createRepositoryStub, invalidParam, makeHashIDStub, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadCustomersOrdersController } from "./load-orders"

const makeSut = () => {
    const idHasher = makeHashIDStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoadCustomersOrdersController(idHasher, repositoryStub)
    return { sut, idHasher, repositoryStub, collectionStub }
}

describe('LoadOrdersController', () => {
    it('should return 400 if no customer is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decoder', async () => {
        const { sut, idHasher } = makeSut()
        const decodeSpy = jest.spyOn(idHasher, 'decode')
        const request: HttpRequest = {
            body: {},
            params: {
                customer: "valid-customer"
            }
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
    it('should return 400 if invalid customer', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        const request: HttpRequest = {
            body: {},
            params: {
                customer: "invalid-customer"
            }
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('customer'))
})
})