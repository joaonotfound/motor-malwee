import { HashID } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


export class DeleteOrderController {
    constructor( private readonly encoder: HashID ){}
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        const { id } = request.body
        const privateID = this.encoder.decode(id)
        return privateID
    }
}