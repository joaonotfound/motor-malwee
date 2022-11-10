import { Post, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


@Post('/order')
export class CreateOrderController {
    @RequiredParams(['customer'])
    async handle(request: HttpRequest){
        return request
    }
}