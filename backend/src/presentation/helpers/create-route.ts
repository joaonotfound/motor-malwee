import { METHOD } from "../models/route-model"
import { HttpRequest, HttpResponse } from "../protocols"
import { RouteModel } from "../models/route-model"

export const createRoute = (method: METHOD, callback: (req: HttpRequest) => Promise<HttpResponse>): RouteModel => {
    return {
        method,
        callback
    }
}