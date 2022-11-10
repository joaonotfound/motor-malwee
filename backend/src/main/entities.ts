import { addressEntity, collectionEntity, customerEntity, groupEntity, orderEntity, orderItemEntity, productsEntity, subGroupEntity, userEntity } from '@/domain'
import { Group, SubGroup, User, Zip, Collection, Product, Customer, Address, Order, OrderItem } from '@/infra'

export const entities: Zip = [
    { value: userEntity, ormEntity: User },
    { value: groupEntity, ormEntity: Group },
    { value: subGroupEntity, ormEntity: SubGroup },
    { value: collectionEntity, ormEntity: Collection },
    { value: productsEntity, ormEntity: Product },
    { value: customerEntity, ormEntity: Customer },
    { value: addressEntity, ormEntity: Address },
    { value: orderEntity, ormEntity: Order },
    { value: orderItemEntity, ormEntity: OrderItem }
]
