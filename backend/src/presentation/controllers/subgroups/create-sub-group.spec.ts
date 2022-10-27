import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { CreateSubGroupController } from "./create-sub-group"

const makeSut = () => {
    const sut = new CreateSubGroupController()
    return { sut }
}

describe('CreateSubGroupController', () => {
    it('should return 400 if no description is provided', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {
                group: 'valid-group'
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
})