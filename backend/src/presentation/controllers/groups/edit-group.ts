import { groupEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/groups')
export class EditGroupController {
    constructor(
        private readonly repository: Repository
    ){}

    @RequiredParams(['group', 'new_group'], { on: 'body'})
    async handle(request: HttpRequest){
        const { group, new_group } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }

        const newGroup = Object.assign({}, match_group, new_group)
        await this.repository.collection(groupEntity).update(newGroup)
        
        return ok({ edited: true })
    }

}