import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateCustomerController } from "./create-customer"

const makeSut = () => {
    const sut = new CreateCustomerController()
    return { sut }
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
})