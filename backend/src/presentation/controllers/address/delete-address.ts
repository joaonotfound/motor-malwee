import { addressEntity, HashID, Repository } from "@/domain";
import { Del, RequiredParams } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Del('/address')
export class DeleteAddressController {
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const private_id = this.idHasher.decode(id)
        await this.repository.collection(addressEntity).deactivate({ id: private_id})
        return ok({ deleted: true })
    }   
}