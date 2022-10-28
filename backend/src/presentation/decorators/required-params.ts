import { missingParam } from "../helpers"
import { HttpRequest } from "../protocols"

type Config = { on: 'params' | 'body' }

export function RequiredParams(required: string[], config: Config = { on: "body" }) {
    return function (_: any, _2: string, transcriptor: PropertyDescriptor) {
        const originalMethod = transcriptor.value
        transcriptor.value = function (request: HttpRequest) {
            let passed_params: any = []
            if(config.on == 'body' ){
                passed_params = request.body
            }
            if(config.on == 'params'){
                passed_params = request.params
            }
            if(!passed_params && required){
                return missingParam(required[0])
            }                       
            for (const required_param of required) {
                if (!passed_params[required_param]) {
                    return missingParam(required_param)
                }
            }
            return originalMethod.apply(this, arguments)
        }
        return transcriptor
    }
}