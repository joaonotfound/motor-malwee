import { DeleteProductController } from './../../presentation/controllers/products/delete-product';
import { DeleteGroupController } from './../../presentation/controllers/groups/delete-group';
import { DeleteCustomerController } from './../../presentation/controllers/customers/delete-customer';
import { DeleteCollectionController } from './../../presentation/controllers/collections/delete-collection';
import * as express from 'express'
import { Router } from "express"

import { JWTTokenManager, MD5Encrypter, MikroRepository, ValidatorEmail} from '@/infra'
import {  EditGroupController, LoadGroupsController, CreateAccountController, CreateSubGroupController, LoadSubGroupsController, LoginController, PrivateController, CreateProductController, LoadProductsController, CreateCustomerController } from '@/presentation'
import { entities } from '../entities'
import { createRouters } from '../helpers'
import { CreateGroupController } from '@/presentation/controllers/groups/create-group'
import { CreateCollectionController, EditCollectionController, LoadCollectionController } from '@/presentation/controllers/collections'
import { LoadCustomersController } from '@/presentation/controllers/customers/load-customers'
import { DeleteSubgroupController } from '@/presentation/controllers/subgroups/delete-sub-group';

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
    const deleteGroupController = new DeleteGroupController(repository)

    const createCollectionController = new CreateCollectionController(repository)
    const loadCollectionsController = new LoadCollectionController(repository)
    const editCollectionController = new EditCollectionController(repository)
    const deleteCollectionController = new DeleteCollectionController(repository)

    const createProductController = new CreateProductController(repository)
    const loadProductsController = new LoadProductsController(repository)
    const deleteProductController = new DeleteProductController(repository)
    
    const createSubGroupController = new CreateSubGroupController(repository)
    const loadSubGroupController = new LoadSubGroupsController(repository)
    const deleteSubgroupController = new DeleteSubgroupController(repository)

    const createCustomerController = new CreateCustomerController(repository)
    const loadCustomerController = new LoadCustomersController(repository)
    const deleteCustomerController = new DeleteCustomerController(repository)

    const routers = createRouters(jwtTokenManager, deleteProductController, deleteGroupController, createAccountController, privateController, loginController, createGroupController, loadGroupsController, loadSubGroupController, createSubGroupController, editGroupsController, createCollectionController, editCollectionController, loadCollectionsController, createProductController, loadProductsController, createCustomerController, loadCustomerController, deleteCustomerController, deleteCollectionController, deleteSubgroupController)        

    routers.forEach((router: Router) => {
        app.use(router)    
    });
}


