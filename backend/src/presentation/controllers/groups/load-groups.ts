import { groupEntity, HashID, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";
import { ok, safeGroups } from "@/presentation/helpers";

@Get('/groups')
export class LoadGroupsController {
    constructor(
        private readonly repository: Repository,
        private readonly encoder: HashID
    ){}

    async handle(){
        const groups = await this.repository.collection(groupEntity).find({})
        return ok({ groups: safeGroups(groups, this.encoder) })
    }
}