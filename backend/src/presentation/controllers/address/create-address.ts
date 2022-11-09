import { Address, addressEntity, customerEntity, HashID, Repository } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/address')
export class CreateAddressController{
    constructor( private readonly idHasher: HashID, private readonly repository: Repository  ){}
    @RequiredParams(['street', 'city', 'state', 'country', 'district', 'customer'])
    async handle(request: HttpRequest<Partial<Address>>){
        const { customer } = request.body 
        const address = request.body

        const private_id = this.idHasher.decode(customer)
        const matchUser = await this.repository.collection(customerEntity).findOne({ id: private_id })
        if(!matchUser){
            return invalidParam('customer')
        }
        await this.repository.collection(addressEntity).save({ ...address, customer: private_id })
        return ok({ created: true })
        
    }
}