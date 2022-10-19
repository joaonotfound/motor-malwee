import { RouteModel } from "@/presentation/models/route-model";
import * as express from 'express'
import { ExpressRouteAdapter } from "../adapters/express-route-adapter";

export function registerRoute(router: express.Router, config: { base_url: string, route: RouteModel }){
    const route = config.route
    const url = config.base_url + config.route.route
    console.log(url, route.callback)
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