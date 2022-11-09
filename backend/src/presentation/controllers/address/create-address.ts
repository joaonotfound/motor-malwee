import { Address } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


export class CreateAddressController{
    @RequiredParams(['street', 'city', 'state', 'country', 'district', 'user'])
    async handle(request: HttpRequest<Partial<Address>>){
        console.log(request)
        
    }
}