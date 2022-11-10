import { addressEntity, customerEntity, HashID, orderEntity, OrderEntity, orderItemEntity, OrderItemEntity, Repository } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { PublicOrderItem, validateOrderItem } from "@/presentation/validate-orders";


const saveOrderItems = async (orderItems: PublicOrderItem[], order: OrderEntity, repository: Repository, encoder: HashID) => {    
    
    if(!orderItems) return    
    if(!await validateOrderItem(orderItems, repository, encoder)) return

    console.log('reached 1')
    const toSave: OrderItemEntity[] = []
    for(const orderItem of orderItems){
        toSave.push({...orderItem, order: order.id, product: encoder.decode(orderItem.product)})
    }
    console.log('reached 2')
    for(const save of toSave){
        await repository.collection(orderItemEntity).save(save)
    }    
}

@Post('/order')
export class CreateOrderController {
    constructor( private readonly encoder: HashID, private readonly repository: Repository ){}

    @RequiredParams(['customer', 'address'])
    async handle(request: HttpRequest){
        const { customer, address, orderItems } = request.body

        const customerPrivateId = this.encoder.decode(customer)

        const matchCustomer = await this.repository.collection(customerEntity).findOne({ id: customerPrivateId })
        if(!matchCustomer){
            return invalidParam('customer')
        }
        const addressPrivateId = this.encoder.decode(address)

        const matchAddress = await this.repository.collection(addressEntity).findOne({ id: addressPrivateId })
        if(!matchAddress){
            return invalidParam('address')
        }

        const order = await this.repository.collection(orderEntity).save({ customer: matchCustomer.id, address: matchAddress.id })
        saveOrderItems(orderItems, order, this.repository, this.encoder )
        
        return ok({ created: true })
    }
}