import { missingParam, invalidParam, invalidCredentials, ok } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoginController } from "./login"
import { EmailValidator, Encrypter, TokenManager, Validation } from "@/domain"
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
const makeTokenManagerStub = () => {
    return new class TokenManagerStub implements TokenManager {
        async generate(_: any): Promise<string> {
            return 'token'
        }
        async validate(_: string): Promise<Validation<any>> {
            return { is_valid: true, arguments: {} }
        }        
    }
}
const makeSut = () => {
    const emailValidator = makeEmailValidatorStub()
    const encrypterStub = makeEncrpterStub()
    const tokenManagerStub = makeTokenManagerStub()
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new LoginController(emailValidator, repositoryStub, encrypterStub, tokenManagerStub )
    return { sut, emailValidator, encrypterStub, repositoryStub, collectionStub, tokenManagerStub }
}

describe('Login Controller', () => {
    test('should return 400 if no username is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                password: 'valid-password'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('email'))
    })
    test('should return 400 if no username is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                email: 'valid-email'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('password'))
    })
    test('should return 400 if invalid email', async () => {
        const { sut, emailValidator } = makeSut()
        jest.spyOn(emailValidator, 'validate').mockResolvedValueOnce({ is_valid: false })
        const request: HttpRequest = {
            body: {
                email: 'invalid-email',
                password: 'valid-password'
            },
            params: {}
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
            body: {
                email: 'invalid-email',
                password: 'invalid-password'
            },
            params: {}
        }        
        const response = await sut.handle(request)
        expect(response).toEqual(invalidCredentials())
    })

    test('should return 200 if valid credentials', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockImplementationOnce(
            async () => ({ username: 'valid-username', email: 'valid-email'})
        )
        const request: HttpRequest = {
            body: {
                email: 'valid-email',
                password: 'valid-password'
            },
            params: {}
        }     
        const response = await sut.handle(request)
        expect(response).toEqual(
            ok({
                account: { username: 'valid-username', email: "valid-email" },
                token: 'token'
            }))
    })
})