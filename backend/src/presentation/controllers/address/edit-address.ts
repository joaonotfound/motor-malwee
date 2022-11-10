import { addressEntity, HashID, Repository, userEntity } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/address')
export class EditAddressController{
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['customer', 'id'])
    async handle(request: HttpRequest){
        const { customer, id } = request.body
        const address = request.body

        const customerPrivateId = this.idHasher.decode(customer)
        const addressPrivateId = this.idHasher.decode(id)

        const matchCustomer = await this.repository.collection(userEntity).findOne({ id: customerPrivateId })
        if(!matchCustomer){
            return invalidParam('customer')
        }        
        const matchAddress = await this.repository.collection(addressEntity).findOne({ id: addressPrivateId })
        if(!matchAddress){
            return invalidParam('address')
        }
        
        await this.repository.collection(userEntity).update(Object.assign({}, address, { customer: customerPrivateId, address: addressPrivateId } ))

        return request

    }
}