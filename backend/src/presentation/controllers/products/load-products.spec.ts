import { createRepositoryStub, makeHashIDStub, ok } from "@/presentation/helpers"
import { LoadProductsController } from "./load-products"

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const encoder = makeHashIDStub()
    const sut = new LoadProductsController(repositoryStub, encoder)
    return { sut, repositoryStub, collectionStub }
}

describe('LoadProductsController', () => {
    it('should return the list of products', async () => {
        const { sut } = makeSut()

        const response = await sut.handle()
        expect(response).toEqual(ok({ products: [] }))
    })
})