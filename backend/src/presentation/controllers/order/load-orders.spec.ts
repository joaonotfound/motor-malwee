import { createRepositoryStub, makeHashIDStub } from "@/presentation/helpers"
import { HttpRequest } from "@/presentation/protocols"
import { LoadOrdersController } from "../customer"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const encoder = makeHashIDStub()
    const sut = new LoadOrdersController(repositoryStub, encoder)
    return { sut, repositoryStub, collectionStub }
}
describe('LoadOrdersController', () => {
    it('should return an array', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual([])
    })
})