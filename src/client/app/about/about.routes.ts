import { Route } from '@angular/router';
import { AboutComponent } from './index';
import {CanActivateService} from '../Services/canActivate.service';
export const AboutRoutes: Route[] = [
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [CanActivateService]
  }
];
