import { collectionEntity, Repository } from "@/domain";
import { Get } from "@/presentation/decorators";
import { ok, safeCollections } from "@/presentation/helpers";

@Get('/collections')
export class LoadCollectionController {
    constructor(
        private readonly repository: Repository
    ){}

    async handle(){
        const collections = await this.repository.collection(collectionEntity).find({})
        return ok({ collections: safeCollections(collections) })
    }
}