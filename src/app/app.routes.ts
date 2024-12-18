import { Routes } from '@angular/router';
import { notAuthGuard } from './core/guards/not-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
// Rutas públicas
{ path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), canActivate: [notAuthGuard] },
{ path: 'login', loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent), canActivate: [authGuard] },
{ path: 'register', loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent), canActivate: [authGuard] },

// Ruta de redirección que usa shortUrl
{ path: ':shortUrl', loadComponent: () => import('./pages/redirect/redirect.component').then(c => c.RedirectComponent) },

// Ruta de error 404
{ path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) },

// Ruta para manejar cualquier otra coincidencia
{ path: '**', redirectTo: '404', pathMatch: 'full' }
];
