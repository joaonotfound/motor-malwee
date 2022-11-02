import { ok } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";



@Del('/customers')
export class DeleteCustomerController{
    @RequiredParams(['customer'])
    async handle(request: HttpRequest){
        return ok(request)
    }
}