import { PermissionLevel } from "../models"
import { createTemplateDecorator } from "./create-template-decorator"

const default_permission_level: PermissionLevel = 'private'

export function Get(url: string, permission_level: PermissionLevel = default_permission_level){
    return createTemplateDecorator(url, 'GET', permission_level)
}
export function Post(url: string, permission_level: PermissionLevel = default_permission_level){
    return createTemplateDecorator(url, 'POST', permission_level)
}
export function Put(url: string, permission_level: PermissionLevel = default_permission_level){
    return createTemplateDecorator(url, 'PUT', permission_level)
}
export function Del(url: string, permission_level: PermissionLevel = default_permission_level){
    return createTemplateDecorator(url, 'DELETE', permission_level)
}
