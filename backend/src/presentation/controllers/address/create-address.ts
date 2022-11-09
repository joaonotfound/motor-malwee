import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


export class CreateAddressController{
    @RequiredParams(['street', 'city', 'state', 'country', 'district'])
    async handle(request: HttpRequest){
        console.log(request)
    }
}