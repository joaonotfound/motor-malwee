import { HttpResponse } from "../protocols";
import { badRequest } from "./bad-request";

export function missingParam(param: string): HttpResponse {
    return badRequest({ error: `missing parameter ${param}`})
}