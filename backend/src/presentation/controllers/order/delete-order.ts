import { HashID, orderEntity, Repository } from "@/domain";
import { Del, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Del('/orders')
export class DeleteOrderController {
    constructor( private readonly encoder: HashID, private readonly repository: Repository ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const privateID = this.encoder.decode(id)
        await this.repository.collection(orderEntity).deactivate({ id: privateID })
    }
}