import { CustomerEntity } from "@/domain"

export const safeCustomers = (values: Array<any>): CustomerEntity[] => {
    return values.map(customer => ({ popularName: customer.popularName, CPNJ: customer.CPNJ, companyName: customer.companyName }))
}