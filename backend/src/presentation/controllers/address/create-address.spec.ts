import { HashID } from "@/domain"
import { createRepositoryStub, invalidParam, missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateAddressController } from "./create-address"

const makeHashIDStub = () => {
    class HashIdStub implements HashID {
        encode(_: number): string {
            return ''
        }
        decode(_: string): number {
            return 0
        }
    }
    return new HashIdStub()
}
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
    it('should return 400 if no user was providen', async () => {
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
        expect(response).toEqual(missingParam('user'))
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
                user: "valid-user"
            }, params: {}            
        }
        await sut.handle(request)
        expect(decodeSpy).toHaveBeenCalledWith('valid-user')
    })
    it('should return 400 if invalid-user', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(false)
        
        const request: HttpRequest = {
            body: {
                street: "valid-street",
                city: "valid-city",
                state: 'valid-state',
                country: "valid-country",
                district: "valid-district",
                user: "invalid-user"
            }, params: {}            
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('user'))
    })
})