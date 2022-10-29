import { customerEntity, Repository } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

export class CreateCustomerController{
    constructor(
        private readonly repository: Repository
    ){}
    @RequiredParams(['popularName', 'CPNJ', 'companyName'])
    async handle(request: HttpRequest){
        const { CPNJ } = request.body
        let match_user = await this.repository.collection(customerEntity).find({ CPNJ }) 
        if(match_user){
            return invalidParam('CPNJ')
        }
        
        return request
    }
}