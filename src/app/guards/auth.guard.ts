import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  
  console.log(localStorage.getItem('username'));
  if(localStorage.getItem('username') == "not logged" || localStorage.getItem('username') == null){
    return false
   }

  return true;
};
