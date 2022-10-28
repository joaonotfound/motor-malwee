import { collectionEntity, groupEntity, productsEntity, subGroupEntity, userEntity } from '@/domain'
import { Group, SubGroup, User, Zip, Collection, Product } from '@/infra'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
    { value: groupEntity, ormEntity: Group },
    { value: subGroupEntity, ormEntity: SubGroup },
    { value: collectionEntity, ormEntity: Collection },
    { value: productsEntity, ormEntity: Product }
]
