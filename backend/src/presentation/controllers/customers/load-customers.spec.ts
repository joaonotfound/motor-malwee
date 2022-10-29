import { createRepositoryStub, ok } from "@/presentation/helpers"
import { LoadCustomersController } from "./load-customers"

const makeSut = () => {
    const { repositoryStub } = createRepositoryStub()
    const sut = new LoadCustomersController(repositoryStub)
    return { sut }    
}

describe("LoadCustomersController", () => {
    it('should return list of customers', async () => {
        const { sut } = makeSut()

        const response = await sut.handle() 
        expect(response).toEqual(ok({ customers: [] }))
    })
})