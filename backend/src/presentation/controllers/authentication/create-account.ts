import { invalidParam, ok, HttpRequest, alreadyInUse, Post, RequiredParams } from "@/presentation";
import { Repository, userEntity, EmailValidator, Encrypter, TokenManager } from "@/domain";

@Post('/auth/logon', 'public')
export class CreateAccountController {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly encrypter: Encrypter,
        private readonly repository: Repository,
        private readonly tokenManager: TokenManager
    ){}

    async isInUse(where: any): Promise<boolean> {
        return await this.repository.collection(userEntity).findOne(where) ? true : false
    }

    @RequiredParams('username', 'password', 'email')
    async handle(request: HttpRequest) {
        const params = request.params

        const validationEmail = await this.emailValidator.validate(params.email)
        if (!validationEmail.is_valid) {
            return invalidParam('email')
        }

        if(await this.isInUse({ username: params.username })){
            return alreadyInUse('username')
        }

        if(await this.isInUse({ email: params.email })){
            return alreadyInUse('email')
        }
                
        const account = {
            username: params.username,
            email: params.email,
            password: params.password
        }

        const safe_account = {
            ...account, 
            password: await this.encrypter.encrypt(account.password)
        }
        const response_account = {
            username: account.username,
            email: account.email
        }
        const token = await this.tokenManager.generate(response_account)

        await this.repository.collection(userEntity).save(safe_account)

        return ok({ created: true, account: response_account, token })
    }
}