import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  if (localStorage.getItem("username")) {
    return true;
  }

  router.navigate(['/login']); // Asegúrate de que esta ruta esté configurada
  return false;
};
