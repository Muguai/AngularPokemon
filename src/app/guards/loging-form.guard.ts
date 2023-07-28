import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { STORAGE_KEY_USER } from '../const/storage-keys';


@Injectable({
  providedIn: 'root'
})
export class logingFormGuard implements CanActivate {

  constructor(private readonly router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem(STORAGE_KEY_USER) == undefined || sessionStorage.getItem(STORAGE_KEY_USER) == null){
        return true
       }
       
      this.router.navigateByUrl('pokedex');
      return false;
  }
  
}
