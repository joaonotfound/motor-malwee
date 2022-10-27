import { groupEntity, Repository } from "@/domain";
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
        const { group } = request.params
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }

        return ok({ created: true })
    }
}