import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        var login = state.url == '/login';
        var expire = localStorage.getItem('expire'), token = localStorage.getItem('access_token');
        if(token && expire && new Date() < new Date(expire))
        {
            if(login)
                this.router.navigateByUrl('/dashboard');
            else
                return true;
        }
        if(!login)
            this.router.navigateByUrl('/login');
        return login;
    }

}
