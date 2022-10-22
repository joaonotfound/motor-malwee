import { HttpResponse } from "../protocols";
import { badRequest } from "./bad-request";

export function invalidParam(param: string): HttpResponse {
    return badRequest({ error: `invalid param: ${param}`})
}