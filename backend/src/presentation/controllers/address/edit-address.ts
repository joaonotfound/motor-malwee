import { Put, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Put('/address')
export class EditAddressController{
    @RequiredParams(['customer'])
    async handle(request: HttpRequest){
        return request
    }
}