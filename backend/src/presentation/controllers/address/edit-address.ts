import { addressEntity, HashID, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/address')
export class EditAddressController{
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const address = request.body

        const addressPrivateId = this.idHasher.decode(id)

        const matchAddress = await this.repository.collection(addressEntity).findOne({ id: addressPrivateId })
        if(!matchAddress){
            return invalidParam('id')
        }
        const updatedData = Object.assign({}, address, { id: addressPrivateId, customer: matchAddress.customer } )
    
        await this.repository.collection(addressEntity).update(updatedData)

        return ok({ edited: true })

    }
}