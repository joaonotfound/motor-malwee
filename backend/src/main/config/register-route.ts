import { RouteModel } from "@/presentation";
import * as express from 'express'
import { ExpressRouteAdapter } from "../adapters";

export function registerRoute(router: express.Router, url: string, route: RouteModel){ 
    switch(route.method){
        case "GET":
            router.get(url, ExpressRouteAdapter(route.callback))
            break
        case "POST":
            router.post(url, ExpressRouteAdapter(route.callback))
            break
        case "DELETE":
            router.delete(url, ExpressRouteAdapter(route.callback))
            break;
        case "PUT":
            router.put(url, ExpressRouteAdapter(route.callback))
            break;
    }
}