import { Entity } from "./entity-model";

export class UserEntity extends Entity {
    constructor( public username: string, public password: string, public email: string ){ 
        super()
    }
}

export const userEntity = new UserEntity('', '', '')