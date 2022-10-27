import { TokenManager, Validation } from "@/domain";
import * as jwt from 'jsonwebtoken'

export class JWTTokenManager<T extends Object> implements TokenManager<T>{    
    private readonly JWT_SECRET = process.env.JWT_SECRET || "the-most-secret-key"

    async generate(args: T): Promise<string>{
        return jwt.sign(args, this.JWT_SECRET, { expiresIn: '1d' })
    }

    validate(token: string): Promise<Validation<T>> {               
        return new Promise(resolve => {
            if (token == undefined || token == null) {
                resolve({ is_valid: false })
            }

            jwt.verify(token, this.JWT_SECRET, (error: any, decoded: any) => {
                if (error) resolve({ is_valid: false });
                resolve({ is_valid: true, arguments: decoded })
            })
        })
    }
}

