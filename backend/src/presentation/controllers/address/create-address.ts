import { Address, HashID } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


export class CreateAddressController{
    constructor( private readonly idHasher: HashID ){}
    @RequiredParams(['street', 'city', 'state', 'country', 'district', 'user'])
    async handle(request: HttpRequest<Partial<Address>>){
        const { user } = request.body
        const private_id = this.idHasher.decode(user)
        console.log(request, private_id)
        
    }
}