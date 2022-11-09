import { Address, addressEntity, HashID, Repository, userEntity } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Post('/address')
export class CreateAddressController{
    constructor( private readonly idHasher: HashID, private readonly repository: Repository  ){}
    @RequiredParams(['street', 'city', 'state', 'country', 'district', 'user'])
    async handle(request: HttpRequest<Partial<Address>>){
        const { user } = request.body 
        const address = request.body

        const private_id = this.idHasher.decode(user)
        const matchUser = await this.repository.collection(userEntity).findOne({ id: private_id })
        if(!matchUser){
            return invalidParam('user')
        }
        await this.repository.collection(addressEntity).save({ ...address, user: private_id })
        return ok({ created: true })
        
    }
}