import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

export class CreateCustomerController{
    
    @RequiredParams(['popularName', 'CPNJ', 'companyName'])
    async handle(request: HttpRequest){
        return request
    }
}