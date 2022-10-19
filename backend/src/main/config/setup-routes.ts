import loadControllers from "../helpers/load-controllers"
// import { PublicController } from "@/presentation/models/public-controller"
import { Router } from "express"
import * as express from 'express'
import { Controller } from "@/presentation/models/controller-model"
import { registerRoute } from "./register-route"

// function classExtends(child: any, parent: any){
//     return Object.getOwnPropertyDescriptor(child, 'prototype')?.value instanceof parent
//   }

export function setupRoutes(app: express.Application){
    const controllers = loadControllers()
    
    controllers.forEach((controller: any) => {
        let router: Router = Router()
        const instance: Controller = new controller()
        const routes = instance.export()
        routes.forEach(route => registerRoute(router, { base_url: instance.base_url, route }))
        app.use(router)
    })
}


