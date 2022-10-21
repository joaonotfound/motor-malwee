import { Entity } from "./entity-model";

export class UserEntity extends Entity {
    constructor( readonly username: string, readonly password: string, readonly email: string ){ 
        super()
    }
}

export const userEntity = new UserEntity('', '', '')