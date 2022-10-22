
type Validation = {
    is_valid: boolean
}

export interface EmailValidator {
    validate(email: string): Promise<Validation>
}