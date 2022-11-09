import { Get, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Get('/address')
export class LoadAddressController {
    @RequiredParams(['user'], { on: 'params' })
    async handle(request: HttpRequest){
        return request
    }
}