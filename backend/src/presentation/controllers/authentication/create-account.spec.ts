import { EmailValidator, Encrypter, TokenManager, Validation } from "@/domain"
import { missingParam, createRepositoryStub, alreadyInUse, invalidParam, ok } from "@/presentation/helpers"
import { HttpRequest, HttpResponse } from "@/presentation/protocols"
import { CreateAccountController } from "./create-account"

const makeEncrpterStub = () => {
    return new class EncrypterStub implements Encrypter {
        async encrypt(_: string): Promise<string> {
            return 'hashed_password'
        }        
    }
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
    const encrypterStub = makeEncrpterStub()
    const tokenManagerStub = makeTokenManagerStub()
    const { collectionStub, repositoryStub } = createRepositoryStub()
    
    const sut = new CreateAccountController(emailValidatorStub, encrypterStub, repositoryStub, tokenManagerStub )
    return { sut, emailValidatorStub, repositoryStub, collectionStub, encrypterStub, tokenManagerStub }
}

describe('CreateAccount', () => {
    test('should return missing param if no email is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                username: 'valid-username',
                password: 'valid-password'
            },
            params: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('email'))
    })
    test('should return missing param if no password is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                username: 'valid-username',
                email: 'valid-email'
            },
            params: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('password'))
    })
    test('should return missing param if no email is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                email: 'valid-email',
                password: 'valid-password'
            },
            params: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(missingParam('username'))
    })
    test('should return invalid email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'validate').mockResolvedValueOnce({ is_valid: false })
        const request: HttpRequest = {
            body: {
                username: 'valid-username',
                email: 'invalid-email',
                password: 'valid-password'
            },
            params: {}
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
            body: {
                username: 'valid-username',
                email: 'already-in-use-email',
                password: 'valid-password'
            },
            params: {}
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
            body: {
                username: 'already-in-use-username',
                email: 'valid-email',
                password: 'valid-password'
            },
            params: {}
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
            body: {
                username: 'already-in-use-username',
                email: 'valid-email',
                password: 'valid-password'
            },
            params: {}
        }
        const response: HttpResponse = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('username'))
    })

    test('should return 200 if the account was created.', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                username: 'valid-username',
                email: 'valid-email',
                password: 'valid-password'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(
            ok({
                created: true,
                account: {
                    username: 'valid-username',
                    email: 'valid-email'
                },
                token: 'token'
            })
        )})
})