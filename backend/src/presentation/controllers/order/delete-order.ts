import { RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";


export class DeleteOrderController {
    @RequiredParams(['id'])
    async handle(request: HttpRequest){
        return request
    }
}