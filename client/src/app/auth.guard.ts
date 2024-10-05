import { CanActivateFn, Router} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const _authService = inject(AuthenticationService);
  const router = inject(Router);

  let isLoggedIn = _authService.isLoggedIn();
  console.log(isLoggedIn);
  
  if (isLoggedIn) {
    return true;
  } else{
    router.navigate(['login']);
    return false;
  }
  return true;
};
