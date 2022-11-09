import { createRepositoryStub, makeHashIDStub, missingParam } from "@/presentation/helpers"
import { LoadCustomerController } from "./load-customer"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const idHasher = makeHashIDStub()
    const sut = new LoadCustomerController(repositoryStub, idHasher)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadCustomerController', () => {
    it('should return 400 if no id was providen', async () => {
        const { sut } = makeSut()
        const request = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('id'))
    })
})