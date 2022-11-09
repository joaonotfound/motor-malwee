import { addressEntity, customerEntity, HashID, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok, safeAddress } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/address')
export class LoadAddressController {
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['customer'], { on: 'params' })
    async handle(request: HttpRequest){
        const { customer } = request.params
        const private_id = this.idHasher.decode(customer)
        console.log(customer, private_id)
        const matchCustomer = await this.repository.collection(customerEntity).findOne({ id: private_id })
        if(!matchCustomer){
            return invalidParam('customer')
        }
        const addressess = await this.repository.collection(addressEntity).find({ customer: private_id })
        return ok({ addresses: safeAddress(addressess) })
    }
}