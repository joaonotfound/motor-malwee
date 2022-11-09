import { Address, HashID } from "@/domain"

export const safeAddress = (values: Array<any>, idHasher: HashID): Partial<Address>[] => {
     return values.map(a => ({ 
        id: idHasher.encode(a.id),
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