import { HashID,  orderEntity, orderItemEntity, productsEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

const handleOrdersItem =  async (ordersItem: Partial<any>, repository: Repository, orderID: number, encoder: HashID) => {
    
    const { product: productParam, quantity } = ordersItem
    if(!productParam && quantity) return

    if(!ordersItem.id){

        const productID = encoder.decode(ordersItem.product)
        const product = await repository.collection(productsEntity).findOne({ id: productID })
        if(!product) return

        const toSave = {
            order: orderID,
            quantity,  
            product: product.id, 
            unitPrice: product.price, 
            totalPrice: product.price * quantity
        }

        return await repository.collection(orderItemEntity).save(toSave)
    }
    return
    // console.log('editing')
    // return await repository.collection(orderItemEntity).update(ordersItem as OrderEntity)

}
@Put('/orders')
export class EditOrderController {
    constructor( private readonly repository: Repository, private readonly encoder: HashID ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id, ordersItems } = request.body
        const publicID = this.encoder.decode(id)    
        
        const matchOrder = await this.repository.collection(orderEntity).findOne({ id: publicID })
        if(!matchOrder){
            return invalidParam('id')
        }

        for(const ordersItem of ordersItems){
            await handleOrdersItem(ordersItem, this.repository, publicID, this.encoder)
        }

        return ok({ edited: true})
    }
}