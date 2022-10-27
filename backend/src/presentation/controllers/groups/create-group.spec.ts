import { missingParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { CreateGroupController } from "./create-group";

const makeSut = () => {
    const sut = new CreateGroupController();
    return { sut }

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
})