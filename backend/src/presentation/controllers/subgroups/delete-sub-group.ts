import { groupEntity, Repository } from "@/domain";
import { Del, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Del('/subgroups')
export class DeleteSubgroupController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['description', 'group'])
    async handle(request: HttpRequest){
        const { description } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description })
        if(!match_group){
            return invalidParam('group')
        }
        return ok(request)
    }
}