import { collectionEntity, HashID, productsEntity, Repository, subGroupEntity } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/products')
export class EditProductsController{
    constructor(private readonly encoder: HashID, private readonly repository: Repository){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const product = request.body

        const privateID = this.encoder.decode(id)
        const matchProduct = await this.repository.collection(productsEntity).findOne({ id: privateID })
        if(!matchProduct){
            return invalidParam('id')
        }
        const matchCollection = await this.repository.collection(collectionEntity).findOne({ description: product.collection })
        if(!matchCollection){
            return invalidParam('collection')
        }
        const matchSubgroup = await this.repository.collection(subGroupEntity).findOne({ description: product.subgroup })
        if(!matchSubgroup){
            return invalidParam('subgroup')
        }
        await this.repository.collection(productsEntity).update({ ...product, id: privateID, fk_collection: matchCollection.id, fk_subgroup: matchSubgroup.id})

        return ok({ edited: true })
    }
}