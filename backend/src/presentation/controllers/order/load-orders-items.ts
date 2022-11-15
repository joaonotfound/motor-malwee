import { HashID } from "@/domain";
import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

export class LoadOrdersItemsController {
    constructor(
        private readonly encoder: HashID
    ){}
    @RequiredParams(['id'], { on: "params" })
    async handle(request: HttpRequest){
        const { id } = request.params
        const privateID = this.encoder.decode(id)
        return privateID
    }
}