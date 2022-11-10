import { HashID, productsEntity, Repository } from "@/domain";

export type PublicOrderItem = {
    product: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}

export const validateOrderItem = async (orderItems: PublicOrderItem[], repository: Repository, encoder: HashID): Promise<boolean> => {
    for (const orderItem of orderItems) {
        const productID = encoder.decode(orderItem.product)
        const matchProduct = await repository.collection(productsEntity).findOne({ id: productID })
        if(!matchProduct){
            console.log('invalid-product')
            return false
        }
        if(orderItem.quantity == 0 || orderItem.unitPrice == 0 || orderItem.totalPrice == 0){
            console.log(orderItem)
            return false
        }
    }
    return true
}