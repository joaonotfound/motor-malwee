import { Repository } from "@/domain/repository"
import { ControllerMethod } from './controller-method'

export type PermissionLevel = 'public' | 'private'

export class Controller {
    base_url: string = '/'
    method: ControllerMethod = "GET"
    permission_level: PermissionLevel = 'public'
    constructor(protected readonly repository: Repository) { }
}