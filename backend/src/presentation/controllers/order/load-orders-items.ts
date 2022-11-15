import { HashID, orderEntity, Repository } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

export class LoadOrdersItemsController {
    constructor(
        private readonly encoder: HashID,
        private readonly repository: Repository
    ){}
    @RequiredParams(['id'], { on: "params" })
    async handle(request: HttpRequest){
        const { id } = request.params
        const privateID = this.encoder.decode(id)
        
        const orderMatch = await this.repository.collection(orderEntity).findOne({ id: privateID })
        if(!orderMatch){
            return invalidParam('id')
        }

        return privateID
    }
}