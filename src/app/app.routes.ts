import { Routes } from '@angular/router';
import { validateSessionGuard } from './core/guards/validate-session.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },

    {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.DASHBOARD_ROUTES),
        canActivate: [validateSessionGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
