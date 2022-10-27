import { groupEntity, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/subgroup')
export class LoadSubGroupsController{
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams('group')
    async handle(request: HttpRequest) {
        const { group } = request.params  
        const matchGroup = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!matchGroup){
            return invalidParam('group')        
        }
        return ok([])
    }
}