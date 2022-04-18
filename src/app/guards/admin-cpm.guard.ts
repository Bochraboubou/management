import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCPMGuard implements CanActivate {
  constructor (private loginService: LoginService,
    private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.loginService.isAdminCPM())
    return true;
    else
    
    this.router.navigate(['forbidden']);
    return false;
    }
  
}
