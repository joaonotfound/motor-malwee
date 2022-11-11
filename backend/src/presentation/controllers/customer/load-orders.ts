import { customerEntity, HashID, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";


@Get('/customer/orders')
export class LoadOrdersController {
    constructor( private encoder: HashID, private repository: Repository ){}
    @RequiredParams(['customer'], { on: "params" })
    async handle(request: HttpRequest){
        const { customer } = request.params
        const privateId = this.encoder.decode(customer)
        const matchCustomer = await this.repository.collection(customerEntity).findOne({ id: privateId })
        if(!matchCustomer){
            return invalidParam('customer')
        }
        return ok({ orders: [] })
    }
}