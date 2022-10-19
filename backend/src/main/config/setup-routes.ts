import loadControllers from "../helpers/load-controllers"
// import { PublicController } from "@/presentation/models/public-controller"
import { Router } from "express"
import * as express from 'express'
import { Controller } from "@/presentation/models/controller-model"
import { registerRoute } from "./register-route"
import { PrivateController } from "@/presentation/models/private-controller"
import { OrmRepository } from "@/infra/mikro-orm/protocols/orm-repository"
import { mikroHelper } from "@/infra/mikro-orm/helpers/mikro-helper"
// import { RouteModel } from "@/presentation/models/route-model"

function classExtends(child: any, parent: any){
    return Object.getOwnPropertyDescriptor(child, 'prototype')?.value instanceof parent
}

export function setupRoutes(app: express.Application){
    const controllers = loadControllers()
    
    controllers.forEach(async (controller: any) => {
        let router: Router = Router()
        const repository = new OrmRepository(await mikroHelper.getEm())
        const instance: Controller = new controller(repository)
        const routes = instance.export()

        if(classExtends(controller, PrivateController)){
            router.use((req: any, res: express.Response, next: any) => {
                res.send({ message: "essa rota é privada"})
                req; next;
            })
        }
        
        routes.forEach(route =>{ 
            const bounded_route = {
                ...route,
                callback: Object.bind(instance, route.callback)(),
            }
            // console.log(bounded_route)
            registerRoute(router, { base_url: instance.base_url, route: bounded_route })
        })
    
        app.use(router)
    })
}


