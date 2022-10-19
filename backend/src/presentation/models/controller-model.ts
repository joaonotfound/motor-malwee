import { Repository } from "@/data/repository"
import { RouteModel } from "./route-model"

export type PERMISSION_LEVEL = 'public' | 'authenticated'

export class Controller {
    constructor(
        protected readonly repository: Repository
    ){
    }
    base_url: string = '/'
    export (): RouteModel[] {
        return []
    }
}