import { Del, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Del('/address')
export class DeleteAddressController {
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        return request
    }
}