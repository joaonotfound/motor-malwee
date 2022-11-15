import { OrderItem } from "./order-item";

export interface Order {
    id?: string,
    ordersItems?: OrderItem[]
    customer: string,
    address: string,    
}