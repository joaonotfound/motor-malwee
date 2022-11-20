import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly canActivate$ = new Subject<boolean>()

  constructor(
    private readonly router: Router
  ) { }

  private async checkAuthentication(){
    
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const auth = localStorage['authentication-token']      
    // TODO: check if the token expired.
    if(auth) return true
    this.router.navigateByUrl('/login')
    return false
  }
}
