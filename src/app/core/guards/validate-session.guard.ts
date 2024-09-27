import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const validateSessionGuard: CanActivateFn = (route, state) =>
{
  const router = inject(Router);
  const authService = inject(AuthService);

  const isLogged = authService.isLoggedUser;
  const urlTree = router.createUrlTree(['/login']);
  return isLogged ? true : urlTree;
};

const route = {
  path: 'dashboard',
  canActivate: [validateSessionGuard]
}

