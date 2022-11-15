import { HashID, orderEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/orders')
export class EditOrderController {
    constructor( private readonly repository: Repository, private readonly encoder: HashID ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const publicID = this.encoder.decode(id)    
        
        const matchOrder = await this.repository.collection(orderEntity).findOne({ id: publicID })
        if(!matchOrder){
            return invalidParam('id')
        }

        return request
    }
}