import { customerEntity, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { ok, safeCustomers } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/customer')
export class LoadCustomerController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['cpnj'], { on: "params" })
    async handle(request: HttpRequest){
        const { cpnj } = request.params;
        const match_customer = await this.repository.collection(customerEntity).findOne({ CPNJ: cpnj })
        return ok(safeCustomers([match_customer])[0])
    }
}