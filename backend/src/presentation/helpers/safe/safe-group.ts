import { GroupEntity } from "@/domain"

export const safeGroups = (values: Array<any>): GroupEntity[] => {
     return values.map(group => ({ description: group.description }))
}