import { Get, RequiredParams } from "@/presentation/decorators";
import { ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/auth/login')
export class LoginController {
    @RequiredParams('email', 'password')
    async handle(_: HttpRequest){
        return ok({ message: 'login succesfully'})
    }
}