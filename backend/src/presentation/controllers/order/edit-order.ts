import { Put, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Put('/orders')
export class EditOrderController {
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        return request
    }
}