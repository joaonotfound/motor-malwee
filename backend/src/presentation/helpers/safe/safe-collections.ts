import { CollectionEntity } from "@/domain"

export const safeCollections = (values: Array<any>): CollectionEntity[] => {
     return values.map(collection => ({ description: collection.description }))
}