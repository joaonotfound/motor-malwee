import { HashID, OrderEntity, orderEntity, Repository } from "@/domain";
import { OrderItem } from "@/infra";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

const handleOrdersItem =  async (ordersItem: Partial<OrderItem>, repository: Repository, orderID: number) => {
    const isValidOrdersItem = () => {
        const keys1 = Object.keys({ ...ordersItem, id: '' }).sort()
        const keys2 = Object.keys(orderEntity).sort()
        return JSON.stringify(keys1) == JSON.stringify(keys2)        
    }
    if(!isValidOrdersItem()){
        return
    }
    if(!ordersItem.id){
        return await repository.collection(orderEntity).save({ ...ordersItem, id: orderID } as OrderEntity)
    }
    return await repository.collection(orderEntity).update(ordersItem as OrderEntity)

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
            await handleOrdersItem(ordersItem, this.repository, publicID)
        }

        return request
    }
}