import { HashID, Repository, userEntity } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/address')
export class EditAddressController{
    constructor( private readonly idHasher: HashID, private readonly repository: Repository ){}
    @RequiredParams(['customer', 'id'])
    async handle(request: HttpRequest){
        const { customer } = request.body
        const privateId = this.idHasher.decode(customer)
        const matchCustomer = await this.repository.collection(userEntity).findOne({ id: privateId })
        if(!matchCustomer){
            return invalidParam('customer')
        }
        // await this.repository.collection(userEntity).update(Object.assign({}, ))
        return request

    }
}