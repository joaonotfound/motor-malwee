import { createRepositoryStub, makeHashIDStub } from "@/presentation/helpers"
import { LoadOrdersController } from "./load-orders"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const encoder = makeHashIDStub()
    const sut = new LoadOrdersController(repositoryStub, encoder)
    return { sut, repositoryStub, collectionStub }
}
describe('LoadOrdersController', () => {
    it('should return an array', async () => {
        const { sut } = makeSut()
        const response = await sut.handle()
        expect(response).toEqual([])
    })
})