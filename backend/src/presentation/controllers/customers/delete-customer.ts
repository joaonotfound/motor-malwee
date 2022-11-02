import { invalidParam } from '@/presentation/helpers';
import { customerEntity } from './../../../domain/entities/customer';
import { Repository } from '@/domain';
import { ok } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";



@Del('/customers')
export class DeleteCustomerController{
    constructor( private readonly repository: Repository ){}

    @RequiredParams(['customer'])
    async handle(request: HttpRequest){
        const { customer } = request.body

        const deletedCustomer = await this.repository.collection(customerEntity).deactivate({ CPNJ: customer })
        if(!deletedCustomer){
            return invalidParam('customer')
        }
        
        return ok(request)
    }
}