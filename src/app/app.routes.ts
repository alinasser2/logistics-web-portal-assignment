// app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ListShipmentsComponent } from './features/shipments/components/list-shipments/list-shipments.component';
import { CreateShipmentComponent } from './features/shipments/components/create-shipment/create-shipment.component';

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
      },
      {
        path: 'shipments/new',
        component: CreateShipmentComponent
      }
    ]
  }
];