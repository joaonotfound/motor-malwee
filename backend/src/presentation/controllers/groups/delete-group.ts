import { ok } from '@/presentation/helpers';
import { invalidParam } from '@/presentation/helpers';
import { groupEntity } from './../../../domain/entities/group-entity';
import { Repository } from '@/domain';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";

@Del('/groups')
export class DeleteGroupController {
    constructor( private readonly repository: Repository ){}
    @RequiredParams(['group'])
    async handle(request: HttpRequest){
        const { group } = request.body
        const deletedGroup = await this.repository.collection(groupEntity).deactivate({ description: group })
        if(!deletedGroup){
            return invalidParam("group")
        }
        return ok({ deleted: true })
    }
}