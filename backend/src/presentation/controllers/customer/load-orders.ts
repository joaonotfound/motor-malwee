import { Get, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


@Get('/customer/orders')
export class LoadOrdersController {
    @RequiredParams(['customer'], { on: "params" })
    async handle(request: HttpRequest){
        return request
    }
}