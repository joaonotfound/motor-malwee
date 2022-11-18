import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam, missingParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/subgroups')
export class CreateSubGroupController {
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams(['group'])
    async handle(request: HttpRequest){
        const { group, subgroup } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!subgroup.description){
            return missingParam('description on subgroup')
        }
        if(!match_group){
            return invalidParam('group')
        }

        const equal_subgroup = await this.repository.collection(subGroupEntity).findOne({ description: subgroup.description, fk_group: match_group.id })
        if(equal_subgroup){
            return invalidParam('description')
        }
        await this.repository.collection(subGroupEntity).save({ description: subgroup.description, fk_group: match_group.id! })
        return ok({ created: true })
    }
}