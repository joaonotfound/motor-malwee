import { HashID } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Get('/address')
export class LoadAddressController {
    constructor( private readonly idHasher: HashID ){}
    @RequiredParams(['user'], { on: 'params' })
    async handle(request: HttpRequest){
        const { user } = request.params
        const private_id = this.idHasher.decode(user)
        return private_id
    }
}