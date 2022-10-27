import { alreadyInUse, missingParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { CreateGroupController } from "./create-group";
import { createRepositoryStub } from "@/presentation/helpers";

const makeSut = () => {
    const { repositoryStub, collectionStub } = createRepositoryStub()
    const sut = new CreateGroupController(repositoryStub);
    return { sut, repositoryStub, collectionStub }

}
describe('Create Group', () => {
    it('should return 400 if no description is provided. ', async () => {
        const { sut } = makeSut()
        const request: HttpRequest = {
            body: {},
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(missingParam('description'))
    })
    it('should return 400 if the group already exists', async () => {
        const { sut, collectionStub } = makeSut()
        jest.spyOn(collectionStub, 'findOne').mockResolvedValueOnce(true)

        const request: HttpRequest = {
            body: {
                description: "Already-in-use-username"
            },
            params: {}
        }
        const response = await sut.handle(request)
        expect(response).toEqual(alreadyInUse('description'))
    })
})