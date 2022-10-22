import { HttpRequest } from "@/presentation";
import { Request } from "express";

export function HttpRequestAdapter (request: Request): HttpRequest{
    return {
        params: request.params,
        body: request.body
    }
}