import { Get } from "../decorators";
import { ok } from "../helpers";

@Get('/auth/private')
export class PrivateController {
    async handle(){
        return ok({ message: 'rota alcançada com sucesso.'})
    }
}