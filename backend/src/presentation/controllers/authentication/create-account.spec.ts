import { EmailValidator } from "@/domain"
import { missingParam, createRepositoryStub, alreadyInUse } from "@/presentation/helpers"
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
    test('should return email already in use', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockReturnValueOnce(new Promise<any>(resolve => resolve({})))
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
})