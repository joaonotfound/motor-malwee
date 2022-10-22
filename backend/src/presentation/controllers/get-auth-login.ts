import { Get } from "../decorators";
import { Repository,  userEntity } from "@/domain"
import { ok } from "../helpers";

@Get('/auth/login', 'public')
export class Login {
    constructor( private readonly repository: Repository ){}
    async handle(){
        console.log(await this.repository.collection(userEntity).find({ id: 1 }))
        return ok({ message: 'rota alcançada com sucesso. '})
    }
}