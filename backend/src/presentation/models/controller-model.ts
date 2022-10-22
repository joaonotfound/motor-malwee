import { ControllerMethod } from './controller-method'

export type PermissionLevel = 'public' | 'private'

export interface Controller {
    base_url: string
    method: ControllerMethod
    permission_level: PermissionLevel 
}