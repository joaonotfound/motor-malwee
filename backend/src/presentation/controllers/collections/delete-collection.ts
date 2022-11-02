import { ok } from '@/presentation/helpers';
import { HttpRequest } from './../../protocols';
import { Del, RequiredParams } from "@/presentation/decorators";

@Del('/collections')
export class DeleteCollectionController {
    @RequiredParams(['description'])
    async handle(request: HttpRequest){
        return ok(request)
    }
}