import { groupEntity, userEntity } from '@/domain'
import { Group, User, Zip } from '@/infra'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
    { value: groupEntity, ormEntity: Group }
]
