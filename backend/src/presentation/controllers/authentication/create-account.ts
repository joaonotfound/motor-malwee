import { invalidParam, ok, HttpRequest, alreadyInUse, Put, RequiredParams } from "@/presentation";
import { Repository, userEntity, EmailValidator, Encrypter, TokenManager } from "@/domain";

@Put('/auth/logon', 'public')
export class CreateAccountController {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly encrypter: Encrypter,
        private readonly repository: Repository,
        private readonly tokenManager: TokenManager
    ){}

    private async isInUse(where: any): Promise<boolean> {
        return await this.repository.collection(userEntity).findOne(where) ? true : false
    }

    @RequiredParams('username', 'password', 'email')
    async handle(request: HttpRequest) {
        const { email, password, username } = request.body

        const validationEmail = await this.emailValidator.validate(email)
        if (!validationEmail.is_valid) {
            return invalidParam('email')
        }

        if(await this.isInUse({ username })){
            return alreadyInUse('username')
        }

        if(await this.isInUse({ email })){
            return alreadyInUse('email')
        }
                
        const account = {
            username, email, password
        }

        const safe_account = {
            ...account, 
            password: await this.encrypter.encrypt(password)
        }
        
        const response_account = {
            username, email
        }

        await this.repository.collection(userEntity).save(safe_account)
        const token = await this.tokenManager.generate(response_account)

        return ok({ created: true, account: response_account, token })
    }
}