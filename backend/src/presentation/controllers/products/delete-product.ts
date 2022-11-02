import { ok } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { productsEntity } from '@/domain';
import { Repository } from '@/domain';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";

@Del('/products')
export class DeleteProductController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['product'])
    async handle(request: HttpRequest){
        const { product } = request.body
        const deletedProduct = await this.repository.collection(productsEntity).deactivate({ description: product })
        if(!deletedProduct){
            return invalidParam("product")
        }
        return ok({ deleted: true })
    }
}