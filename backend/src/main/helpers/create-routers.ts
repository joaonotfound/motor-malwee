import { Controller } from "@/presentation/models/controller-model"
import { HttpResponse, HttpRequest } from "@/presentation/protocols"
import  { Router, Response } from "express"
import { registerRoute } from "../config/register-route"

export function createRouters(...controllers: Array<Controller & { handle(_: any): Promise<HttpResponse> }> | any ): Router[] {
    const response: Router[] = []

    controllers.forEach((controller: any) => {
        const router = Router()
        const isPrivate = controller.permission_level == 'private'
        console.log('registrando rota', controller.method, controller.base_url, 'is private:', isPrivate)
        if (isPrivate) {
            router.use((req: any, res: Response, next: any) => {
                res.send({ message: "essa rota é privada" })
                req; next;
            })
        }
        const callback = (req: HttpRequest): Promise<HttpResponse> => controller.handle(req)
        registerRoute(router, controller.base_url, { method: controller.method, callback })
        response.push(router)
    })
    return response
}
