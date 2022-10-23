import { EmailValidator } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/auth/login')
export class LoginController {
    constructor(
        private readonly emailValidator: EmailValidator
    ){}
    @RequiredParams('email', 'password')
    async handle(request: HttpRequest){
        const { email } = request.params
        
        const validation = await this.emailValidator.validate(email)
        if(!validation.is_valid){
            return invalidParam('email')
        }

        return ok({ message: 'login succesfully'})
    }
}