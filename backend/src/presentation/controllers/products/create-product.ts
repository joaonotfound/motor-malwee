import { groupEntity, Repository, subGroupEntity } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/products')
export class CreateProductController {
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams(['description', 'price', 'group', 'subgroup', 'collection'])
    async handle(request: HttpRequest){
        const { group, subgroup } = request.body
        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }
        const match_subgroup = await this.repository.collection(subGroupEntity).findOne({ fk_group: match_group.id, description: subgroup })
        if(!match_subgroup){
            return invalidParam('subgroup')
        }
        // const match_product = await this.repository.collection(productsEntity).findOne({ fk_subgroup:})
        return request
    }
}