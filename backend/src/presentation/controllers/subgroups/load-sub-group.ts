import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok, safeGroups } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/subgroups')
export class LoadSubGroupsController{
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams('group')
    async handle(request: HttpRequest) {
        const { group } = request.body
        const matchGroup = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!matchGroup){
            return invalidParam('group')        
        }
        const response = await this.repository.collection(subGroupEntity).find({ fk_group: matchGroup.id })
        return ok({group: matchGroup.description, subgroups: safeGroups(response)})
    }
}