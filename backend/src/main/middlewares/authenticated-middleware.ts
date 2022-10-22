import { Request, Response } from "express";
import { TokenManager } from "@/domain";

export function authenticatedMiddleware(tokenManager: TokenManager): any {
    return async (request: Request, response: Response, next: any) => {
        const token = request.headers.authorization
        if(!token){
            response.status(401).send({ error: "you must authenticate to access this route" })
            return
        }
        const verification = await tokenManager.validate(token)
        if(!verification.is_valid){
            response.status(401).send({
                error: "providen token is invalid"    
            })
            return
        }
        next();
    }    
}
