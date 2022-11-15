import { Repository } from "@/domain";
import { Product } from "@/infra";
import { Get } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { HttpResponse } from "@/presentation/protocols";

@Get('/products')
export class LoadProductsController {
    constructor(
        private readonly repository: Repository
    ){}
    async handle(): Promise<HttpResponse<{products: Array<Product>}>>{
        const products = await this.repository.execute(getSelectQuery())
        return ok({ products })
    }
}

function getSelectQuery(): string {
    return "select p.description, p.price, c.description as collection, sb.description as subgroup, g.description as `group` "+
        "from `Product` as p "+
        "left join `Collection` as c on p.fk_collection = c.id "+
        "left join `SubGroup` as sb on p.fk_subgroup = sb.id "+
        "left join `Group` as g on sb.fk_group = g.id "+
        "where p.status = 1"
}