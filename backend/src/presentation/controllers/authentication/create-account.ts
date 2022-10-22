import { missingParam, invalidParam, ok, HttpRequest } from "@/presentation";
import { Repository, userEntity, EmailValidator } from "@/domain";

export class CreateAccountController {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly repository: Repository
    ){}

    async handle(request: HttpRequest) {
        const params = request.params
        const requiredFields = ['username', 'password', 'email']

        for (const field of requiredFields) {
            if (!params[field]) {
                return missingParam(field)
            }
        }

        const validationEmail = await this.emailValidator.validate(request.body.email)
        if (!validationEmail.is_valid) {
            return invalidParam('email')
        }

        const account = await this.repository.collection(userEntity).save({
            username: params.username,
            email: params.email,
            password: params.password
        })

        return ok(account)
    }
}