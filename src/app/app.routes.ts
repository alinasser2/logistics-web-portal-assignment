import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ListShipmentsComponent } from './features/shipments/components/list-shipments/list-shipments.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'shipments',
        pathMatch: 'full'
      },
      {
        path: 'shipments',
        component: ListShipmentsComponent
      }
    ]
  }
];