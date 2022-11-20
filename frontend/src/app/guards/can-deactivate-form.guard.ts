import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { ICanDeactivate } from "./can-deactivate-form";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ICanDeactivate> {
    canDeactivate(component: ICanDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): Promise<boolean> | boolean {
        return component.canDeactivate()
    }
    
}