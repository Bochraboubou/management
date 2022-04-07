import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementGuard implements CanActivate {
  constructor (private loginService: LoginService,
    private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.loginService.isChefProjet())
    return true;
    else
    
    this.router.navigate(['forbidden']);
    return false;
    }
}
