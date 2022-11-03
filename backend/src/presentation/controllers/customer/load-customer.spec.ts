import { createRepositoryStub, missingParam } from "@/presentation/helpers"
import { LoadCustomerController } from "./load-customer"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoadCustomerController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadCustomerController', () => {
    it('should return 400 if no cpnj was providen', async () => {
        const { sut } = makeSut()
        const request = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('cpnj'))
    })
})