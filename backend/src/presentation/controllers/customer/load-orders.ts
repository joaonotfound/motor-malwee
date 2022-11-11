import { HashID } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


@Get('/customer/orders')
export class LoadOrdersController {
    constructor( private encoder: HashID ){}
    @RequiredParams(['customer'], { on: "params" })
    async handle(request: HttpRequest){
        const { customer } = request.params
        const privateId = this.encoder.decode(customer)
        return privateId
    }
}