import { userEntity } from '@/data/entities/user-entity'
import { User } from '@/infra/mikro-orm/entities'
import { Zip } from '@/infra/mikro-orm/mikro-repository'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
]
