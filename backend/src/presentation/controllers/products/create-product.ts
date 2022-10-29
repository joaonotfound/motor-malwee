import { collectionEntity, groupEntity, productsEntity, Repository, subGroupEntity } from "@/domain";
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
        const { group, subgroup, collection, description, price } = request.body

        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }

        const match_subgroup = await this.repository.collection(subGroupEntity).findOne({ fk_group: match_group.id, description: subgroup })
        if(!match_subgroup){
            return invalidParam('subgroup')
        }

        const match_collection = await this.repository.collection(collectionEntity).findOne({ description: collection })
        if(!match_collection){
            return invalidParam('collection')
        }

        const match_product =  await this.repository.collection(productsEntity).findOne({ description, fk_collection: collection, fk_subgroup: match_subgroup.id })
        if(match_product){
            return invalidParam('description')
        }

        if(typeof price !== 'number' ){
            return invalidParam('price')
        }
        
        return request
    }
}