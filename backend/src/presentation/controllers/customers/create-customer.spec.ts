import { createRepositoryStub, invalidParam, missingParam, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateCustomerController } from "./create-customer"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateCustomerController(repositoryStub)
    return { sut, repositoryStub, collectionStub }
}

describe('CreateCustomerController', () => {
    it('should return 400 if no popularName is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                CPNJ: 'valid-cpnj',
                companyName: 'valid-company-name'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('popularName'))
    })
    it('should return 400 if no CPNJ is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                popularName: 'valid-popularname',
                companyName: 'valid-company-name'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('CPNJ'))
    })
    it('should return 400 if no companyName is providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: { 
                popularName: 'valid-popularname',
                CPNJ: 'valid-CPNJ'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('companyName'))
    })
    it('should return 400 if already exists an customer with the same CPNJ', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementationOnce(
            async (where: any) => where.CPNJ == 'invalid-CPNJ' ? true : false
        )

        const request: HttpRequest = {
            body: { 
                popularName: 'valid-popularname',
                CPNJ: 'invalid-CPNJ',
                companyName: 'valid-companyName'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('CPNJ'))
    })
    it('should return 200 if the user was created', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const customer = { 
            popularName: 'valid-popularname',
            CPNJ: 'valid-CPNJ',
            companyName: 'valid-companyName'
        }

        const request: HttpRequest = {
            body: customer, 
            params: {}
        }

        const response = await sut.handle(request)
        expect(response).toEqual(ok({ created:true, customer }))
    })
    it('should call save method', async () => {
        const { sut, collectionStub } = makeSut()
        const saveSpy = jest.spyOn(collectionStub, 'save')

        const customer = { 
            popularName: 'valid-popularname',
            CPNJ: 'valid-CPNJ',
            companyName: 'valid-companyName'
        }

        const request: HttpRequest = {
            body: customer, 
            params: {}
        }

        await sut.handle(request)
        expect(saveSpy).toHaveBeenCalledWith(customer)
    })
})