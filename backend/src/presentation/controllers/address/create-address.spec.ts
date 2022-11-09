import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateAddressController } from "./create-address"

const makeSut = () => {
    const sut = new CreateAddressController()
    return { sut }
}

describe('CreateAddressController', () => {
    it('should return 400 if no street was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('street'))
    })
    it('should return 400 if no city was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {
                street: "valid-street"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('city'))
    })
    it('should return 400 if no state was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {
                street: "valid-street",
                city: "valid-city" 
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('state'))
    })
    it('should return 400 if no country was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('country'))
    })
    it('should return 400 if no district was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('district'))
    })
})