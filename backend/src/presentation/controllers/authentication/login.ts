import { EmailValidator, Encrypter, Repository, userEntity } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidCredentials, invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/auth/login')
export class LoginController {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly repository: Repository,
        private readonly encrypter: Encrypter
    ){}

    @RequiredParams('email', 'password')
    async handle(request: HttpRequest){
        const { email, password } = request.params
        
        const validation = await this.emailValidator.validate(email)
        if(!validation.is_valid){
            return invalidParam('email')
        }
        
        const safe_password = await this.encrypter.encrypt(password)
        const possible_user = await this.repository.collection(userEntity).findOne({ email, password: safe_password })

        if(!possible_user){
            return invalidCredentials()
        }

        return ok({ message: 'login succesfully'})
    }
}