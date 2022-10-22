import { HttpResponse } from "../protocols";
import { badRequest } from "./bad-request";

export function alreadyInUse(param: string): HttpResponse {
    return badRequest({ error: `${param} alrady in use`})
}