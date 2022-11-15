import { HashID, Repository } from "@/domain"
import { Get } from "@/presentation/decorators"
import { ok } from "@/presentation/helpers"
import { safeOrders } from "./safe-orders"

export type Response = { 
    CustomerID: string, 
    AddressID: string,
    companyName: string,
    city: string,
    state: string,
    country: string
}

@Get('/orders')
export class LoadOrdersController {
    constructor(private readonly repository: Repository, private readonly encoder: HashID ){}

    async handle(){
        const orders = await loadOrders(this.repository)
        return ok({ orders: safeOrders(orders, this.encoder)})
    }
}

async function loadOrders(repository: Repository){
    const SQL = 
    "SELECT "+ 
        "c.id as CustomerID, a.id as AddressID, c.companyName, a.city, a.state, a.country "+ 
    "from `Order` o "+
    "left join Address a on o.address =  a.id "+
    "LEFT JOIN Customer c on o.customer = c.id "

    return await repository.execute(SQL)
}