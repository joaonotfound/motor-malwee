import { addressEntity, customerEntity, HashID, Repository } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";


@Post('/order')
export class CreateOrderController {
    constructor( private readonly encoder: HashID, private readonly repository: Repository ){}
    @RequiredParams(['customer', 'address'])
    async handle(request: HttpRequest){
        const { customer, address } = request.body
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

        return request
    }
}