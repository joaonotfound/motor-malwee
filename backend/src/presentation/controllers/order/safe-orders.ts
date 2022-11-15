import { HashID } from "@/domain"
import { Response } from "./load-orders"

export const safeOrders = (values: Array<any>, encoder: HashID): Array<Partial<Response>> => {
    return values.map(order => (
        {
            ...order,
            CustomerID: encoder.encode(order.CustomerID),
            AddressID: encoder.encode(order.AddressID)
        }
    ))
}