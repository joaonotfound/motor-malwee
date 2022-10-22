
export type Validation<T> = 
    { is_valid: false } |
    { is_valid: true, arguments: T }

type token = string
export interface TokenManager<T extends Object =any>{
    generate(args: T): Promise<token>,
    validate(token: token): Promise<Validation<T>>
}