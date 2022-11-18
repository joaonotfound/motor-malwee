import { groupEntity, HashID, Repository, subGroupEntity } from "@/domain";
import { Put, RequiredParams } from "@/presentation/decorators";
import { invalidParam, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";

@Put('/groups')
export class EditGroupController {
    constructor(
        private readonly repository: Repository,
        private readonly encoder: HashID
    ){}

    @RequiredParams(['group', 'new_group'], { on: 'body'})
    async handle(request: HttpRequest){
        const { group, new_group } = request.body
        const subgroups = new_group.subgroups

        const match_group = await this.repository.collection(groupEntity).findOne({ description: group })
        if(!match_group){
            return invalidParam('group')
        }

        const newGroup = Object.assign({}, match_group, new_group)
        await this.repository.collection(groupEntity).update(newGroup)
        
        const subgroupsMatch = await this.repository.collection(subGroupEntity).find({ fk_group: match_group.id })
        
        if(subgroups instanceof Array){
            for(const subgroupMatch of subgroupsMatch){
                if(subgroups.filter((i: any) => this.encoder.decode(i.id) == subgroupMatch.id).length == 0){
                    await this.repository.collection(subGroupEntity).deactivate({ id: subgroupMatch.id })            
            }}
            for(const subgroup of subgroups){
                if(subgroup.id){
                    await this.repository.collection(subGroupEntity).update({ ...subgroup, id: this.encoder.decode(subgroup.id),  fk_group: match_group.id})
                }else{
                    await this.repository.collection(subGroupEntity).save({ ...subgroup, fk_group: match_group.id })
        }}}
        
        return ok({ edited: true })
    }

}