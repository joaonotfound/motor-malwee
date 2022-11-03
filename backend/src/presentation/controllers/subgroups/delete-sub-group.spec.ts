import { missingParam } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { DeleteSubgroupController } from "./delete-sub-group"

const makeSut = () => {
    const sut = new DeleteSubgroupController()
    return { sut }
}

describe('DeleteSubgroupController', () => {
    it('should return 400 if no description was providen', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
})

    