import { userEntity } from "@/domain/entities/user-entity";
import { Put } from "../decorators";
import { ok } from "../helpers/ok";
import { PublicController } from "../models/public-controller";

@Put('/auth/login')
export default class Login extends PublicController {
    async handle(){
        console.log(await this.repository.collection(userEntity).find({ id: 1 }))
        return ok({ message: 'rota alcançada com sucesso. '})
    }
}