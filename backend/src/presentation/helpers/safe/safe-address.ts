import { Address } from "@/domain"

export const safeAddress = (values: Array<any>): Partial<Address>[] => {
     return values.map(a => ({ 
        city: a.city,
        state: a.state,
        country: a.country,
        district: a.district,
        street: a.street,
        reference: a.reference,
        complement: a.complement,
        zip: a.zip
    }))
}