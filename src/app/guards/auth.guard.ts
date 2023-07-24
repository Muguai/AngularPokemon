import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  
  console.log(localStorage.getItem('username'));
  if(localStorage.getItem('username') == null){
    console.log("gets here");

    return false;
  }
  if(localStorage.getItem('username') == ""){
    console.log("gets here log");

    return false;
   }
  return true;

};
