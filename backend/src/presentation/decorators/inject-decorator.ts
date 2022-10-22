import { Controller } from "../models"

export function Inject(...dependencies: string[]){
    return function wrapped<T extends { new(...args: any): Controller }>(originalConstructor: T){
        console.log(dependencies, originalConstructor)
    }
}