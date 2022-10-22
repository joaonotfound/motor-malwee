import * as express from 'express'
import { Router } from "express"

import loadControllers from "../helpers/load-controllers"
import { registerRoute } from "./register-route"
import { PrivateController } from "@/presentation/models/private-controller"
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { MikroRepository } from '@/infra/mikro-orm/mikro-repository'
import { entities } from '../entities'

function createRouter(controller: any){
    const router = Router()        
    const isPrivate = controller instanceof PrivateController
    console.log('registrando rota', controller.method, controller.base_url, 'is private:', isPrivate)
    if(isPrivate){
        router.use((req: any, res: express.Response, next: any) => {
            res.send({ message: "essa rota é privada" })
            req; next;
        })
    }
    const callback =  (req: HttpRequest ): Promise<HttpResponse> => controller.handle(req) 
    registerRoute(router, controller.base_url, { method: controller.method, callback } )
    return router
}

export async function setupRoutes(app: express.Application){
    const controllers = loadControllers()    
    const repository = await MikroRepository.create(entities)

    controllers.forEach(async (controller: any) => {        
        const instance = new controller(repository)
        const router = createRouter(instance)        
        app.use(router)
})
}


