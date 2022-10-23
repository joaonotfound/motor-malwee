import { EmailValidator, Encrypter, Repository, TokenManager, userEntity } from "@/domain";
import { Get, RequiredParams } from "@/presentation/decorators";
import { invalidCredentials, invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Get('/auth/login')
export class LoginController {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly repository: Repository,
        private readonly encrypter: Encrypter,
        private readonly tokenManager: TokenManager
    ){}

    @RequiredParams('email', 'password')
    async handle(request: HttpRequest){
        const { email, password } = request.body
        
        const validation = await this.emailValidator.validate(email)
        if(!validation.is_valid){
            return invalidParam('email')
        }
        
        const safe_password = await this.encrypter.encrypt(password)
        const account = await this.repository.collection(userEntity).findOne({ email, password: safe_password })

        if(!account){
            return invalidCredentials()
        }
        const response = {
            username: account.username,
            password: account.password
        }        
        const token = await this.tokenManager.generate(response)
        
        return ok({ token, account })
    }
}