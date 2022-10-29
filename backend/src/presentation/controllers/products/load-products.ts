import { productsEntity, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";

@Get('/products')
export class LoadProductsController {
    constructor(
        private readonly repository: Repository
    ){}
    async handle(){
        const products = await this.repository.collection(productsEntity).find({})
        return products
    }
}