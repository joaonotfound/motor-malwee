
export interface Validation<T>{
    is_valid: boolean,
    arguments: T
}

type token = string
export interface TokenManager<T=any>{
    create(args: T): token,
    validate(token: token): Validation<T>
}