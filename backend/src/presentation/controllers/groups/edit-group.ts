import { Put, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Put('/groups')
export class EditGroupController {
    @RequiredParams(['description'])
    async handle(_: HttpRequest){
        
    }

}