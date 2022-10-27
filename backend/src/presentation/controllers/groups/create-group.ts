import { groupEntity, Repository } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { alreadyInUse, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/groups')
export class CreateGroupController {
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams('description')
    async handle(request: HttpRequest) {
        const { description } = request.body

        const group = await this.repository.collection(groupEntity).findOne({ description })
        
        if(group){
            return alreadyInUse('description')
        }

        await this.repository.collection(groupEntity).save({ description })        

        return ok({ created: true })
    }
}