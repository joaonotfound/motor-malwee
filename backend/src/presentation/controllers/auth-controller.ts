import { createRoute } from "../helpers/create-route";
import { ok } from "../helpers/ok";
import { PublicController } from "../models/public-controller";
import { HttpRequest, HttpResponse } from "../protocols";


export default class AuthController extends PublicController {
    readonly base_url: string = '/auth'

    public export(): any {
        return [
            createRoute('GET', '/login', this.login)
        ]
    }

    async login(_: HttpRequest): Promise<HttpResponse> {
        return ok({ message: "Authenticated succesfully. "})
    }
}