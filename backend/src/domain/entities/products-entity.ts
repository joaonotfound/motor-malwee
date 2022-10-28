import { Entity } from "./entity-model";

export class ProductEntity extends Entity {
    constructor(
        public description: string,
        public price: number,
        public fk_subgroup: string,
        public fk_collection: string
    ) { super() }
}

export const productsEntity = new ProductEntity('', 0, '', '')