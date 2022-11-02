import { invalidParam } from '@/presentation/helpers';
import { collectionEntity } from './../../../domain/entities/collection-entity';
import { Repository } from '@/domain';
import { ok } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";

@Del('/collections')
export class DeleteCollectionController {
    constructor(private readonly repository: Repository) { }

    @RequiredParams(['collection'])
    async handle(request: HttpRequest) {

        const { collection } = request.body
        const deletedEntity = await this.repository
            .collection(collectionEntity)
            .delete({ description: collection })
        
        if(!deletedEntity){
            return invalidParam('collection')
        }

        return ok({ deleted: true })

    }
}