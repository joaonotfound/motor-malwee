import { Entity } from "./entity-model";

export class SubGroupEntity extends Entity {
    constructor(
        public fk_group: number,
        public description: string
    ) { super() }
}

export const subGroupEntity = new SubGroupEntity(0, '')