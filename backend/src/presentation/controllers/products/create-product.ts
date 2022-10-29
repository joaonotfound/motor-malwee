import { Post, RequiredParams } from "@/presentation/decorators";
import { HttpRequest } from "@/presentation/protocols";

@Post('/products')
export class CreateProductController {
    @RequiredParams(['description', 'price', 'subgroup', 'collection'])
    async handle(request: HttpRequest){
        return request
    }
}