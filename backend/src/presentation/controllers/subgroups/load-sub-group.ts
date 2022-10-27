import { Get, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Get('/subgroup')
export class LoadSubGroupsController{
    @RequiredParams('group')
    async handle(_: HttpRequest) {
        
    }
}