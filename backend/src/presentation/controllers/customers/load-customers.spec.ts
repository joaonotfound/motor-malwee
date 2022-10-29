import { createRepositoryStub, ok } from "@/presentation/helpers"
import { LoadCustomersController } from "./load-customers"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoadCustomersController(repositoryStub)
    return { sut, collectionStub }    
}

describe("LoadCustomersController", () => {
    it('should return list of customers', async () => {
        const { sut } = makeSut()

        const response = await sut.handle() 
        expect(response).toEqual(ok({ customers: [] }))
    })
    it('should call find method', async () => {
        const { sut, collectionStub } = makeSut()
        const findSpy = jest.spyOn(collectionStub, 'find')

        await sut.handle()
        expect(findSpy).toHaveBeenCalledWith({})
    })
})