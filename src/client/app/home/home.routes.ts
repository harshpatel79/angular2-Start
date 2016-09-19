import { Route } from '@angular/router';
import { HomeComponent } from './index';

export const HomeRoutes: Route[] = [
  //{ path: '**', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    component: HomeComponent
  }
];
