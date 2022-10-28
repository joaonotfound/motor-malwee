import { Entity } from "./entity-model";

export class CollectionEntity extends Entity {
    constructor(
        public description: string
    ) { super() }
}

export const collectionEntity = new CollectionEntity('')