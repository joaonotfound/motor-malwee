import { HashID } from "@/domain"
import { OrderItem } from "@/infra"

export const safeOrdersItems = (values: Array<OrderItem>, idHasher: HashID): Array<any> => {
    return values.map(item => (
        {
            ...item,
            id: idHasher.encode(item.id),
            product: idHasher.encode(item.product)
        }
    ))
}