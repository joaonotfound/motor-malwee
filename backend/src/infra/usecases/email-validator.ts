import { EmailValidator } from "@/domain"
import validator from 'validator'

export class ValidatorEmail implements EmailValidator {
    async validate(email: string): Promise<{ is_valid: boolean }> {
        return { is_valid: validator.isEmail(email)}
    }    
}