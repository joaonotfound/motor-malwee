import { HashID, orderEntity, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok, safeOrdersItems } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/orders/items')
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

        const response = await loadItems(this.repository, privateID)
        return ok({ items: safeOrdersItems(response, this.encoder) })
    }
}

async function loadItems(repository: Repository, orderID: number){
    const SQL = "SELECT oi.*, p.description as productDescription FROM OrderItem oi "+ 
    "LEFT JOIN Product p on oi.product=p.id "+
    `WHERE oi.order = '${orderID}' AND oi.status = 1`
    return await repository.execute(SQL)
}
