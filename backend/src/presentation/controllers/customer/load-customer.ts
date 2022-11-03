import { customerEntity, Repository } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { ok, safeCustomers } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/customer')
export class LoadCustomerController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['CPNJ'])
    async handle(request: HttpRequest){
        const { CPNJ } = request.body;
        const match_customer = this.repository.collection(customerEntity).findOne({ CPNJ })
        return ok(safeCustomers([match_customer])[0])
    }
}