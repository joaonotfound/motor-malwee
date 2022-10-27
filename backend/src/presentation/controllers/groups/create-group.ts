import { Post, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Post('/groups')
export class CreateGroupController {
    @RequiredParams('description')
    async handle(request: HttpRequest) {
        console.log(request)
    }
}