import { HttpRequest, HttpResponse } from "@/presentation/protocols";
import { Response, Request } from "express";
import { HttpRequestAdapter } from "./http-request-adapter";


export function ExpressRouteAdapter(route: (req: HttpRequest) => Promise<HttpResponse>) {
    return async (request: Request, response: Response) => {
        try{ 
            const route_response = await route(HttpRequestAdapter(request))
            response.status(route_response.status_code).send(route_response.body)            
        }catch(error){
            response.status(500).send({ message: 'INTERNAL SERVER ERROR.'})
            console.log('An error ocurred: ', error)
            console.log('request: ', HttpRequestAdapter(request))
        }

    }
}