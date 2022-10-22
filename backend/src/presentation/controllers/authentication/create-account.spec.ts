import { EmailValidator } from "@/domain"
import { missingParam, createRepositoryStub, alreadyInUse, invalidParam } from "@/presentation/helpers"
import { HttpRequest, HttpResponse } from "@/presentation/protocols"
import { CreateAccountController } from "./create-account"

const makeEmailValidatorStub = () => {
    class EmailValidatorStub implements EmailValidator {  
        async validate(_: string) {
            return { is_valid: true }    
        }
    }
    return new EmailValidatorStub()
}

const makeSut = () => {
    const emailValidatorStub = makeEmailValidatorStub()
    const { collectionStub, repositoryStub } = createRepositoryStub()
    const sut = new CreateAccountController(emailValidatorStub, repositoryStub)
    return { sut, emailValidatorStub, repositoryStub, collectionStub }
}

describe('CreateAccount', () => {
    test('should return missing param if no email is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {
                username: 'valid-username',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('email'))
    })
    test('should return missing param if no password is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {
                username: 'valid-username',
                email: 'valid-email'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('password'))
    })
    test('should return missing param if no email is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {
                email: 'valid-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('username'))
    })
    test('should return invalid email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'validate').mockResolvedValueOnce({ is_valid: false })
        const request: HttpRequest = {
            params: {
                username: 'valid-username',
                email: 'invalid-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(invalidParam('email'))
    })
    test('should return email already in use', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementation(
            async (where: any) => {
                if(where.email){
                    return {}
                }
                return 
            }
        )
        const request: HttpRequest = {
            params: {
                username: 'valid-username',
                email: 'already-in-use-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('email'))
    })
    test('should return username already in use', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementation(
            async (where: any) => {
                if(where.username){
                    return {}
                }
                return 
            }
        )
        const request: HttpRequest = {
            params: {
                username: 'already-in-use-username',
                email: 'valid-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('username'))
    })
    test('should return username already in use', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementation(
            async (where: any) => {
                if(where.username){
                    return {}
                }
                return 
            }
        )
        const request: HttpRequest = {
            params: {
                username: 'already-in-use-username',
                email: 'valid-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('username'))
    })
})