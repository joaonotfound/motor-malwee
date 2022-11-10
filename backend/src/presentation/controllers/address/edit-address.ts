import { HashID } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Put('/address')
export class EditAddressController{
    constructor( private readonly idHasher: HashID ){}
    @RequiredParams(['customer'])
    async handle(request: HttpRequest){
        const { customer } = request.body
        this.idHasher.decode(customer)
        return request
    }
}