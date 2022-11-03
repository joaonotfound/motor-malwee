import { Del, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Del('/subgroups')
export class DeleteSubgroupController {
    @RequiredParams(['description'])
    async handle(request: HttpRequest){
        console.log(request)
    }
}