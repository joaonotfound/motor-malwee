import { HttpResponse } from "../protocols";
import { badRequest } from "./bad-request";

export function invalidCredentials(): HttpResponse {
    return badRequest('invalid credentials')
}