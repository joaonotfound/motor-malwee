import { missingParam, invalidParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoginController } from "./login"
import { EmailValidator } from "@/domain"

const makeEmailValidatorStub = () => {
    class EmailValidatorStub implements EmailValidator {  
        async validate(_: string) {
            return { is_valid: true }    
        }
    }
    return new EmailValidatorStub()
}

const makeSut = () => {
    const emailValidator = makeEmailValidatorStub()
    const sut = new LoginController(emailValidator)
    return { sut, emailValidator }
}

describe('Login Controller', () => {
    test('should 400 if no username is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {
                password: 'valid-password'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('email'))
    })
    test('should 400 if no username is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            params: {
                email: 'valid-email'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('password'))
    })
    test('should 400 if invalid email', async () => {
        const { sut, emailValidator } = makeSut()
        jest.spyOn(emailValidator, 'validate').mockResolvedValueOnce({ is_valid: false })
        const request: HttpRequest = {
            params: {
                email: 'invalid-email',
                password: 'valid-password'
            },
            body: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(invalidParam('email'))
    })
})