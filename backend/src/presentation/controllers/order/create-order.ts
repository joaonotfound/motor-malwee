import { HashID } from "@/domain";
import { Post, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


@Post('/order')
export class CreateOrderController {
    constructor( private readonly encoder: HashID ){}
    @RequiredParams(['customer', 'address'])
    async handle(request: HttpRequest){
        const { customer } = request.body
        this.encoder.decode(customer)
        return request
    }
}