import { ControllerMethod, Controller, PermissionLevel } from "../models"

export function createTemplateDecorator(url: string, method: ControllerMethod, permission_level: PermissionLevel) {
    return function wrapper(originalConstructor: any): any {
        return class extends originalConstructor implements Controller {
            base_url = url
            method = method
            permission_level: PermissionLevel = permission_level
            constructor(...args: any[]){
                super(...args)                
            }
        }
    }
}