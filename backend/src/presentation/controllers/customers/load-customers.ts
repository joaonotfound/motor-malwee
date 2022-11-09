import { customerEntity, HashID, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { safeCustomers } from "@/presentation/helpers";

@Get('/customers')
export class LoadCustomersController {
    constructor( private readonly repository: Repository, private readonly idHasher: HashID ){}
    async handle(){
        const customers = await this.repository.collection(customerEntity).find({})
        return ok({ customers: safeCustomers(customers, this.idHasher) })
    }
}