import { groupEntity, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";
import { ok, safeGroups } from "@/presentation/helpers";

@Get('/groups', 'public')
export class LoadGroupsController {
    constructor(
        private readonly repository: Repository
    ){}

    async handle(){
        const groups = await this.repository.collection(groupEntity).find({})
        return ok({ groups: safeGroups(groups) })
    }
}