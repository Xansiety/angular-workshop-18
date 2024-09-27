
import { HomeComponent } from "./components/home/home.component";
import { ProductComponent } from "./components/product/product.component";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";

import { Routes } from "@angular/router";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { preloadDataResolver } from '../core/resolvers/preload-data.resolver';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'calendar', component: CalendarComponent, resolve: { data: preloadDataResolver } },
            { path: 'products', component: ProductComponent },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]