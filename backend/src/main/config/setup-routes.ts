import * as express from 'express'
import { Router } from "express"

import { JWTTokenManager, MD5Encrypter, MikroRepository, ValidatorEmail} from '@/infra'
import { CreateAccountController } from '@/presentation'
import { entities } from '../entities'
import { createRouters } from '../helpers'
import { PrivateController } from '@/presentation/controllers/private-controller'

export async function setupRoutes(app: express.Application){

    const repository = await MikroRepository.create(entities)
    const jwtTokenManager = new JWTTokenManager()
    const md5Encrypter = new MD5Encrypter()
    const emailValidator = new ValidatorEmail()
    
    const createAccountController = new CreateAccountController(emailValidator, md5Encrypter, repository, jwtTokenManager)
    const privateController = new PrivateController()

    const routers = createRouters(jwtTokenManager, createAccountController, privateController)        

    routers.forEach((router: Router) => {
        app.use(router)    
    });
}


