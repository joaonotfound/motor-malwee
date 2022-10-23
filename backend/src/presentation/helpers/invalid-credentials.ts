import { HttpResponse } from "../protocols";
import { badRequest } from "./bad-request";

export function invalidCredentials(): HttpResponse {
    return badRequest({ error: 'invalid credentials'})
}