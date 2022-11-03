import { Get, RequiredParams } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/customer')
export class LoadCustomerController {
    @RequiredParams(['cpnj'])
    async handle(request: HttpRequest){
        request;
        return ok({})
    }
}