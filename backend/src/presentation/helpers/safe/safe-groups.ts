import { GroupEntity, HashID } from "@/domain"

export const safeGroups = (values: Array<any>, encoder: HashID): GroupEntity[] => {
     return values.map(group => ({ id: encoder.encode(group.id),  description: group.description }))
}