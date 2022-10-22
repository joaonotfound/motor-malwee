
export interface Validation<T>{
    is_valid: boolean,
    arguments: T
}

type token = string
export interface TokenManager<T extends Object =any>{
    create(args: T): Promise<token>,
    validate(token: token): Promise<Validation<T>>
}