import { groupEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/subgroups')
export class EditSubGroupController {
    constructor(
        private readonly repository: Repository
    ){}

    @RequiredParams(['subgroup'], { on: 'body'})
    async handle(request: HttpRequest){
        const { subgroup } = request.body
        const match_subgroup = await this.repository.collection(subgroup).findOne({ id: subgroup.id })
        if(!match_subgroup){
            return invalidParam('subgroup')
        }

        await this.repository.collection(groupEntity).update(subgroup)
        return ok({ edited: true })
    }

}