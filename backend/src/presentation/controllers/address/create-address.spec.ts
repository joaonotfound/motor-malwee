import { createRepositoryStub, invalidParam, missingParam, ok, makeHashIDStub } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateAddressController } from "./create-address"

const makeSut = () => {
    const hashIdStub = makeHashIDStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateAddressController(hashIdStub, repositoryStub)
    return { sut, hashIdStub, repositoryStub, collectionStub }
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
    it('should return 400 if no customer was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = { 
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country",
                district: "valid-district"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('customer'))
    })
    it('should call decode method with right method', async () => {
        const { sut, hashIdStub } = makeSut();
        const decodeSpy = jest.spyOn(hashIdStub, 'decode')
        const request: HttpRequest = {
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country",
                district: "valid-district",
                customer: "valid-customer"
            }, params: {}            
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-customer')
    })
    it('should return 400 if invalid-customer', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)

        const request: HttpRequest = {
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country",
                district: "valid-district",
                customer: "invalid-customer"
            }, params: {}            
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('customer'))
    })
    it('should return 200 if address was created', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)
        
        const request: HttpRequest = {
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country",
                district: "valid-district",
                customer: "valid-customer"
            }, params: {}            
        }
        const response = await sut.handle(request)
        expect(response).toEqual(ok({ created: true }))
    })
})