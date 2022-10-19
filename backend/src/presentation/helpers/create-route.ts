import { METHOD } from "../models/route-model"
import { HttpRequest, HttpResponse } from "../protocols"
import { RouteModel } from "../models/route-model"

export const createRoute = (method: METHOD, route: string, callback: (req: HttpRequest) => Promise<HttpResponse>): RouteModel => {
    return {
        method,
        route,
        callback
    }
}