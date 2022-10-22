import { Controller, PermissionLevel } from "./controller-model";

export abstract class PrivateController extends Controller {
    permission_level: PermissionLevel = 'private'
}