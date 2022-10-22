import { HttpResponse } from "../protocols";

export function badRequest<T=any>(data: T): HttpResponse<T> {
    return {
        status_code: 400,
        body: data
    }    
}