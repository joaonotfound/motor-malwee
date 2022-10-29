import { customerEntity, Repository } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

export class CreateCustomerController{
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams(['popularName', 'CPNJ', 'companyName'])
    async handle(request: HttpRequest){
        const { CPNJ, popularName, companyName } = request.body
        
        let match_user = await this.repository.collection(customerEntity).findOne({ CPNJ }) 
        if(match_user){
            return invalidParam('CPNJ')
        }

        const customer = { CPNJ, companyName, popularName }

        await this.repository.collection(customerEntity).save(customer)

        return ok({ created: true, customer })
    }
}