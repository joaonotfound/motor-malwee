import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Del, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Del('/subgroups')
export class DeleteSubgroupController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['description', 'group'])
    async handle(request: HttpRequest){
        const { description, group } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }        
        const deletedSubgroup = await this.repository.collection(subGroupEntity).deactivate({ description, fk_group: match_group.id })
        if(deletedSubgroup){
            return ok({ deleted: true })
        }
        return invalidParam('description')
    }
}