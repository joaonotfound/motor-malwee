import { Repository } from "@/data/repository"
import { ControllerMethod } from './controller-method'

export class Controller {
    base_url: string = '/'
    method: ControllerMethod = "GET"
    constructor(protected readonly repository: Repository) { }
}