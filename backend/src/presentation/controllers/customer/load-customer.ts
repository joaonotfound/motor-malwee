import { customerEntity, HashID, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { ok, safeCustomers } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/customer')
export class LoadCustomerController {
    constructor( private readonly repository: Repository, private readonly idHasher: HashID ){}
    @RequiredParams(['id'], { on: "params" })
    async handle(request: HttpRequest){
        const { id } = request.params;
        const private_id = this.idHasher.decode(id)
        const match_customer = await this.repository.collection(customerEntity).findOne({ id: private_id })
        return ok(safeCustomers([match_customer], this.idHasher )[0])
    }
}