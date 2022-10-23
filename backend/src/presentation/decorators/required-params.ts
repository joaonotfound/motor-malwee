import { missingParam } from "../helpers"
import { HttpRequest } from "../protocols"

export function RequiredParams(...required: string[]) {
    return function (_: any, _2: string, transcriptor: PropertyDescriptor) {
        const originalMethod = transcriptor.value
        transcriptor.value = function (request: HttpRequest) {
            const params = request.body
            for (const required_param of required) {
                if (!params[required_param]) {
                    return missingParam(required_param)
                }
            }
            return originalMethod.apply(this, arguments)
        }
        return transcriptor
    }
}