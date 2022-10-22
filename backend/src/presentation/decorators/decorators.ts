import { ControllerMethod } from "../models/controller-method";
import { Controller } from "../models/controller-model";

function createTemplateDecorator(url: string, method: ControllerMethod){
    return function wrapper<T extends { new(...args: any[]): Controller }>(originalConstructor: T){
        return class extends originalConstructor {
            constructor(...args: any[]){
                super(...args)
                this.base_url = url
                this.method = method
            }
        }
    }
}

export function Get(url: string){
    return createTemplateDecorator(url, 'GET')
}
export function Post(url: string){
    return createTemplateDecorator(url, 'POST')
}
export function Put(url: string){
    return createTemplateDecorator(url, 'PUT')
}
export function Del(url: string){
    return createTemplateDecorator(url, 'DELETE')
}
