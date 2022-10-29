import * as express from 'express'
import { Router } from "express"

import { JWTTokenManager, MD5Encrypter, MikroRepository, ValidatorEmail} from '@/infra'
import {  EditGroupController, LoadGroupsController, CreateAccountController, CreateSubGroupController, LoadSubGroupsController, LoginController, PrivateController, CreateProductController, LoadProductsController } from '@/presentation'
import { entities } from '../entities'
import { createRouters } from '../helpers'
import { CreateGroupController } from '@/presentation/controllers/groups/create-group'
import { CreateCollectionController, EditCollectionController, LoadCollectionController } from '@/presentation/controllers/collections'

export async function setupRoutes(app: express.Application){

    const repository = await MikroRepository.create(entities)
    const jwtTokenManager = new JWTTokenManager()
    const md5Encrypter = new MD5Encrypter()
    const emailValidator = new ValidatorEmail()
    
    console.log('debug-token: ', jwtTokenManager.generate({}))
    
    const createAccountController = new CreateAccountController(emailValidator, md5Encrypter, repository, jwtTokenManager)
    const privateController = new PrivateController()
    const loginController = new LoginController(emailValidator, repository, md5Encrypter, jwtTokenManager)

    const createGroupController = new CreateGroupController(repository)
    const loadGroupsController = new LoadGroupsController(repository)
    const editGroupsController = new EditGroupController(repository)

    const createCollectionController = new CreateCollectionController(repository)
    const loadCollectionsController = new LoadCollectionController(repository)
    const editCollectionController = new EditCollectionController(repository)

    const createProductController = new CreateProductController(repository)
    const loadProductsController = new LoadProductsController(repository)

    const createSubGroupController = new CreateSubGroupController(repository)
    const loadSubGroupController = new LoadSubGroupsController(repository)

    const routers = createRouters(jwtTokenManager, createAccountController, privateController, loginController, createGroupController, loadGroupsController, loadSubGroupController, createSubGroupController, editGroupsController, createCollectionController, editCollectionController, loadCollectionsController, createProductController, loadProductsController)        

    routers.forEach((router: Router) => {
        app.use(router)    
    });
}


