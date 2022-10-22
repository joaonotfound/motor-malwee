import * as express from 'express'
import { Router } from "express"

import { MikroRepository } from '@/infra/mikro-orm/mikro-repository'
import { entities } from '../entities'
import Login from '@/presentation/controllers/get-auth-login'
import { createRouters } from '../helpers/create-routers'

export async function setupRoutes(app: express.Application){

    const repository = await MikroRepository.create(entities)
    const authLogin = new Login(repository)    

    const routers = createRouters(authLogin)        

    routers.forEach((router: Router) => {
        app.use(router)    
    });
}


