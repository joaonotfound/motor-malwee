import { customerEntity, Repository } from "@/domain";
import { ok } from "@/presentation/helpers";


export class LoadCustomersController {
    constructor( private readonly repository: Repository ){}
    async handle(){
        const customers = await this.repository.collection(customerEntity).find({})
        return ok({ customers })
    }
}