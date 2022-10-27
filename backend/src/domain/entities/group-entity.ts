import { Entity } from "./entity-model";

export class GroupEntity extends Entity {
    constructor(
        public description: string
    ) { super() }
}

export const groupEntity = new GroupEntity('')