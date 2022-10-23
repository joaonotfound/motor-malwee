import { TokenManager } from "@/domain"
import { Controller, HttpResponse, HttpRequest } from "@/presentation"
import { Router } from "express"
import { registerRoute } from "../config"
import { authenticatedMiddleware } from '../middlewares'

export function createRouters(tokenManager: TokenManager, ...controllers: Array<Controller & { handle(_: any): Promise<HttpResponse> }> | any ): Router[] {
    const response: Router[] = []    

    controllers.forEach((controller: any) => {
        const router = Router()
        const isPrivate = controller.permission_level == 'private'
        console.log('registrando rota', controller.method, controller.base_url, 'is private:', isPrivate)
        if (isPrivate) {
            router.use(controller.base_url, authenticatedMiddleware(tokenManager))
        }
        const callback = (req: HttpRequest): Promise<HttpResponse> => controller.handle(req)
        registerRoute(router, controller.base_url, { method: controller.method, callback })
        response.push(router)
    })
    return response
}
