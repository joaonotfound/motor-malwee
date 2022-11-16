import { HashID, productsEntity, Repository } from "@/domain";
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
        await this.repository.collection(productsEntity).update({ ...product, id: privateID })
        return ok({ edited: true })
    }
}