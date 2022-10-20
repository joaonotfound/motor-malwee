import { userEntity } from "@/data/entities/user-entity";
import { ok } from "../helpers/ok";
import { PublicController } from "../models/public-controller";

export default class Login extends PublicController {
    base_url: string = '/auth/login'
    async handle(){
        console.log(await this.repository.collection(userEntity).find({ id: 1 }))
        return ok({ message: 'rota alcançada com sucesso. '})
    }
}