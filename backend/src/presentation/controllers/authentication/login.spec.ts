import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoginController } from "./login"

const makeSut = () => {
    const sut = new LoginController()
    return { sut }
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
})