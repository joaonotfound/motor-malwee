import { HttpResponse } from "../protocols";

export function reject<T=any>(data: T): HttpResponse<T> {
    return {
        status_code: 400,
        body: data
    }    
}