import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/subgroups')
export class CreateSubGroupController {
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams('description', 'group')
    async handle(request: HttpRequest){
        const { group, description } = request.params
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }

        const equal_subgroup = await this.repository.collection(subGroupEntity).findOne({ description, fk_group: match_group.id })
        if(equal_subgroup){
            return invalidParam('description')
        }

        return ok({ created: true })
    }
}