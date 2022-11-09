import { CustomerEntity, HashID } from "@/domain"

export const safeCustomers = (values: Array<any>, idHasher: HashID): CustomerEntity[] => {
    return values.map(customer => ({ id: idHasher.encode(customer.id), popularName: customer.popularName, CPNJ: customer.CPNJ, companyName: customer.companyName }))
}