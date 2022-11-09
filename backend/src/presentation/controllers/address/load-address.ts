import { addressEntity, HashID, Repository, userEntity } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok, safeAddress } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/address')
export class LoadAddressController {
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['user'], { on: 'params' })
    async handle(request: HttpRequest){
        const { user } = request.params
        const private_id = this.idHasher.decode(user)

        const matchUser = await this.repository.collection(userEntity).findOne({ id: private_id })
        if(!matchUser){
            return invalidParam('user')
        }
        const addressess = await this.repository.collection(addressEntity).find({ user: private_id })
        return ok({ addresses: safeAddress(addressess) })
    }
}