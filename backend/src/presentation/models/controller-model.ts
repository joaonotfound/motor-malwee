import { RouteModel } from "./route-model"

export type PERMISSION_LEVEL = 'public' | 'authenticated'

export class Controller {
    base_url: string = '/'

    export (): RouteModel[] {
        return []
    }
    public static create(){
        return new this()
    }
}