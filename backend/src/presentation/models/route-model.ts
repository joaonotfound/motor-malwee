import { HttpRequest, HttpResponse } from "../protocols"

export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' 

export interface RouteModel { 
    method: METHOD,
    callback: (request: HttpRequest) => Promise<HttpResponse>
}