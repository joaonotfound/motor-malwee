import { HttpRequest } from "@/presentation/protocols";
import { Request } from "express";

export function HttpRequestAdapter (request: Request): HttpRequest{
    return {
        params: request.params,
        body: request.body
    }
}