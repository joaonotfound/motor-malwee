import { customerEntity, HashID, Repository } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";


@Post('/order')
export class CreateOrderController {
    constructor( private readonly encoder: HashID, private readonly repository: Repository ){}
    @RequiredParams(['customer', 'address'])
    async handle(request: HttpRequest){
        const { customer } = request.body
        const customerPrivateId = this.encoder.decode(customer)
        const matchCustomer = await this.repository.collection(customerEntity).findOne({ id: customerPrivateId })
        if(!matchCustomer){
            return invalidParam('customer')
        }
        return request
    }
}