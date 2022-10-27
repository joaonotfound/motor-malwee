import { groupEntity, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";

@Get('/groups')
export class LoadGroupsController {
    constructor(
        private readonly repository: Repository
    ){}

    async handle(){
        const groups = await this.repository.collection(groupEntity).find({})
        return ok(groups)
    }
}