import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { STORAGE_KEY_USER } from '../const/storage-keys';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem(STORAGE_KEY_USER) == undefined || sessionStorage.getItem(STORAGE_KEY_USER) == null){
        //this is the only way we can do this without the loginform getting removed when we return false on the guard
        this.router.navigateByUrl("");
        return false
       }
      return true;
  }
  
}
