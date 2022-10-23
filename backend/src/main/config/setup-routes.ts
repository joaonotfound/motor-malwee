import * as express from 'express'
import { Router } from "express"

import { JWTTokenManager, MD5Encrypter, MikroRepository, ValidatorEmail} from '@/infra'
import { CreateAccountController, LoginController, PrivateController } from '@/presentation'
import { entities } from '../entities'
import { createRouters } from '../helpers'

export async function setupRoutes(app: express.Application){

    const repository = await MikroRepository.create(entities)
    const jwtTokenManager = new JWTTokenManager()
    const md5Encrypter = new MD5Encrypter()
    const emailValidator = new ValidatorEmail()
    
    const createAccountController = new CreateAccountController(emailValidator, md5Encrypter, repository, jwtTokenManager)
    const privateController = new PrivateController()
    const loginController = new LoginController(emailValidator, repository, md5Encrypter, jwtTokenManager)

    const routers = createRouters(jwtTokenManager, createAccountController, privateController, loginController)        

    routers.forEach((router: Router) => {
        app.use(router)    
    });
}


