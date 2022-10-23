import { missingParam, invalidParam, invalidCredentials } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoginController } from "./login"
import { EmailValidator, Encrypter } from "@/domain"
import { createRepositoryStub } from '../../helpers/create-repository-stub'

const makeEncrpterStub = () => {
    return new class EncrypterStub implements Encrypter {
        async encrypt(_: string): Promise<string> {
            return 'hashed_password'
        }        
    }
}
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
    const encrypterStub = makeEncrpterStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoginController(emailValidator, repositoryStub, encrypterStub)
    return { sut, emailValidator, encrypterStub, repositoryStub, collectionStub }
}

describe('Login Controller', () => {
    test('should return 400 if no username is provided', async () => {
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
    test('should return 400 if no username is provided', async () => {
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
    test('should return 400 if invalid email', async () => {
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
    test('should return 400 if invalid credentails', async () => {
        const { sut, collectionStub } = makeSut()

        jest.spyOn(collectionStub, 'findOne').mockImplementationOnce(
            async (_) => {
                return null
            }
        )
        
        const request: HttpRequest = {
            params: {
                email: 'invalid-email',
                password: 'invalid-password'
            },
            body: {}
        }        
        const response = await sut.handle(request)
        expect(response).toEqual(invalidCredentials())
    })
})