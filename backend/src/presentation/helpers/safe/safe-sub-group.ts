import { GroupEntity } from "@/domain"

export const safeSubGroup = (values: Array<any>): GroupEntity[] => {
     return values.map(subgroup => ({ description: subgroup.description }))
}