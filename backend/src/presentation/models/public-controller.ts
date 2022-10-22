import { Controller, PermissionLevel } from "./controller-model";

export abstract class PublicController extends Controller{
    permission_level: PermissionLevel = 'public'
}