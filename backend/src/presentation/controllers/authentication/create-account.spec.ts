import { EmailValidator } from "@/domain"
import { missingParam, createRepositoryStub } from "@/presentation/helpers"
import { HttpRequest, HttpResponse } from "@/presentation/protocols"
import { CreateAccountController } from "./create-account"

const makeSut = () => {
    class EmailValidatorStub implements EmailValidator {  
        async validate(_: string) {
            return { is_valid: true }    
        }
    }
    const repositoryStub = createRepositoryStub()
    return new CreateAccountController(new EmailValidatorStub(), repositoryStub)
}

describe('CreateAccount', () => {
    test('should return missing param if no email is provided', async () => {
        const sut = makeSut()
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
        const sut = makeSut()
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
        const sut = makeSut()
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
})