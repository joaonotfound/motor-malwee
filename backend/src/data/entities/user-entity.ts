import { Entity } from "./entity-model";

class UserEntity extends Entity {
    username: string = ''
    password: string = ''    
}

export const userEntity = new UserEntity()