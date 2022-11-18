import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { alreadyInUse, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/groups')
export class CreateGroupController {
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams(['description'])
    async handle(request: HttpRequest) {
        const { description, subgroups } = request.body

        const group = await this.repository.collection(groupEntity).findOne({ description })
        
        if(group){
            return alreadyInUse('description')
        }

        const createdGroup = await this.repository.collection(groupEntity).save({ description })        

        if(subgroups instanceof Array){
            for(const subgroup of subgroups){
                if(subgroup.description || !subgroup.id){
                    await this.repository.collection(subGroupEntity).save({ ...subgroup, fk_group: createdGroup.id })
                }
            }
        }

        return ok({ created: true })
    }
}