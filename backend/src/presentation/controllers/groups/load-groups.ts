import { groupEntity, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";

@Get('/groups')
export class LoadGroupsController {
    constructor(
        private readonly repository: Repository
    ){}

    async handle(){
        await this.repository.collection(groupEntity).find({})
    }
}