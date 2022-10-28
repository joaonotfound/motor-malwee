import { groupEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/groups')
export class EditGroupController {
    constructor(
        private readonly repository: Repository
    ){}

    @RequiredParams(['description'], { on: 'body'})
    async handle(request: HttpRequest){
        const { description } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description })
        if(!match_group){
            return invalidParam('description')
        }

        const newGroup = Object.assign({}, match_group, request.body)
        await this.repository.collection(groupEntity).update(newGroup)
        
        return ok({ edited: true })
    }

}