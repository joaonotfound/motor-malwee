import { collectionEntity, groupEntity, Repository } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/collections')
export class EditCollectionController {
    constructor(
        private readonly repository: Repository
    ){}

    @RequiredParams(['collection', 'new_collection'], { on: 'body'})
    async handle(request: HttpRequest){
        const { collection, new_collection } = request.body
        const match_group = await this.repository.collection(collectionEntity).findOne({ description: collection })
        if(!match_group){
            return invalidParam('collection')
        }

        const newCollection = Object.assign({}, match_group, new_collection)
        await this.repository.collection(collectionEntity).update(newCollection)
        
        return ok({ edited: true })
    }

}