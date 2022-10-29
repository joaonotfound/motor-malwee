import { Entity } from "./entity-model";

export class ProductEntity extends Entity {
    constructor(
        public description: string,
        public price: number,
        public fk_subgroup: number,
        public fk_collection: number
    ) { super() }
}

export const productsEntity = new ProductEntity('', 0, 0, 0)