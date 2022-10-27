import { Post, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


@Post('/subgroups')
export class CreateSubGroupController {
    @RequiredParams('description')
    async handle(_: HttpRequest){
        
    }
}