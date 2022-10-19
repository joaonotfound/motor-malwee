import { HttpResponse } from "../protocols";

export function ok<T=any>(data: T): HttpResponse<T> {
    return {
        status_code: 200,
        body: data
    }    
}