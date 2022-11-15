import { HashID, Repository } from "@/domain";
import { Product } from "@/infra";
import { Get } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { HttpResponse } from "@/presentation/protocols";


const encodeId = (products: Array<Product>, encoder: HashID): any => {
    const response = products.map(item => (
        { ...item, id: encoder.encode(item.id)}
    ))
    return response
}

@Get('/products')
export class LoadProductsController {
    constructor(
        private readonly repository: Repository,
        private readonly encoder: HashID
    ){}
    async handle(): Promise<HttpResponse<{products: Array<Product>}>>{
        const products = await this.repository.execute(getSelectQuery())
        return ok({ products: encodeId(products, this.encoder)})
    }
}

function getSelectQuery(): string {
    return "select p.id, p.description, p.price, c.description as collection, sb.description as subgroup, g.description as `group` "+
        "from `Product` as p "+
        "left join `Collection` as c on p.fk_collection = c.id "+
        "left join `SubGroup` as sb on p.fk_subgroup = sb.id "+
        "left join `Group` as g on sb.fk_group = g.id "+
        "where p.status = 1"
}