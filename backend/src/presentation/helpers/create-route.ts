import { METHOD, RouteModel } from "../models"
import { HttpRequest, HttpResponse } from "../protocols"

export const createRoute = (method: METHOD, callback: (req: HttpRequest) => Promise<HttpResponse>): RouteModel => {
    return {
        method,
        callback
    }
}