import * as express from 'express'
import { Router } from "express"

import loadControllers from "../helpers/load-controllers"
import { registerRoute } from "./register-route"
import { mikroHelper } from '@/infra/mikro-orm/helpers/mikro-helper'
import { OrmRepository } from '@/infra/mikro-orm/protocols/orm-repository'
import { PrivateController } from "@/presentation/models/private-controller"
import { HttpRequest, HttpResponse } from '@/presentation/protocols'

function classExtends(child: any, parent: any){
    return Object.getOwnPropertyDescriptor(child, 'prototype')?.value instanceof parent
}

export async function setupRoutes(app: express.Application){
    
    const controllers = loadControllers()    
    const repository = new OrmRepository(await mikroHelper.getEm())

    controllers.forEach(async (controller: any) => {

        const router = Router()        
        const instance = new controller(repository)
        const isPrivate = classExtends(controller, PrivateController)
    
        if(isPrivate){
            router.use((req: any, res: express.Response, next: any) => {
                res.send({ message: "essa rota é privada" })
                req; next;
            })
        }

        console.log('registrando rota', instance.method, instance.base_url, 'is private:', isPrivate)

        const callback =  (req: HttpRequest ): Promise<HttpResponse> => instance.handle(req) 
        registerRoute(router, instance.base_url, { method: instance.method, callback } )
    
        app.use(router)
    })
}


