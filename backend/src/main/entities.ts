import { groupEntity, subGroupEntity, userEntity } from '@/domain'
import { Group, SubGroup, User, Zip } from '@/infra'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
    { value: groupEntity, ormEntity: Group },
    { value: subGroupEntity, ormEntity: SubGroup }
]
