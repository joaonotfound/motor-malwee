import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CustomersService } from "../services";

@Injectable()
export class CustomerResolver implements Resolve<any>{
    constructor(
        private readonly customersService: CustomersService
    ){}
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>{
        return await this.customersService.loadOne(route.queryParams['id'])
    }
}