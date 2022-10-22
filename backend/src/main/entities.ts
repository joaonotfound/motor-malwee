import { userEntity } from '@/domain'
import { User, Zip } from '@/infra'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
]
