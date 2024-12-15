import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'dashboard',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'rooms',
            loadComponent: () => import('./rooms/rooms.component').then(m => m.RoomsComponent)
          },
          {
            path: 'bookings',
            loadComponent: () => import('./bookings/bookings.component').then(m => m.BookingsComponent)
          },
          {
            path: 'guests',
            loadComponent: () => import('./guests/guests.component').then(m => m.GuestsComponent)
          },
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }
        ]
      }
];