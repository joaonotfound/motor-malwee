import { collectionEntity, groupEntity, subGroupEntity, userEntity } from '@/domain'
import { Group, SubGroup, User, Zip } from '@/infra'
import { Collection } from '@mikro-orm/core'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
    { value: groupEntity, ormEntity: Group },
    { value: subGroupEntity, ormEntity: SubGroup },
    { value: collectionEntity, ormEntity: Collection }
]
