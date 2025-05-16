import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShipmentService } from '../services/shipment.service';
import * as ShipmentsActions from './shipments.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ShipmentsEffects {
  private actions$ = inject(Actions);
  private shipmentService = inject(ShipmentService);

  loadShipments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentsActions.loadShipments),
      mergeMap(({ page, limit }) =>
        this.shipmentService.getAllShipments(page, limit).pipe(
          map(response =>
            ShipmentsActions.loadShipmentsSuccess({
              shipments: response.items,
              currentPage: page,
              totalPages: response.meta.lastPage,
              totalItems: response.meta.total
            })
          ),
          catchError(err =>
            of(ShipmentsActions.loadShipmentsFailure({ error: err.message || 'Failed to load shipments' }))
          )
        )
      )
    )
  );

  createShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentsActions.createShipment),
      mergeMap(({ shipmentData }) =>
        this.shipmentService.createShipment(shipmentData).pipe(
          map(response => ShipmentsActions.createShipmentSuccess({ shipment: response.data })),
          catchError(err =>
            of(ShipmentsActions.createShipmentFailure({ error: err.message || 'Failed to create shipment' }))
          )
        )
      )
    )
  );

  checkoutShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentsActions.checkoutShipment),
      mergeMap(({ shipmentId }) =>
        this.shipmentService.checkoutShipment(shipmentId).pipe(
          map(shipment => ShipmentsActions.checkoutShipmentSuccess({ shipment })),
          catchError(err =>
            of(ShipmentsActions.checkoutShipmentFailure({ error: err.message || 'Failed to checkout shipment' }))
          )
        )
      )
    )
  );

  deliverShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentsActions.deliverShipment),
      mergeMap(({ shipmentId }) =>
        this.shipmentService.deliverShipment(shipmentId).pipe(
          map(shipment => ShipmentsActions.deliverShipmentSuccess({ shipment })),
          catchError(err =>
            of(ShipmentsActions.deliverShipmentFailure({ error: err.message || 'Failed to deliver shipment' }))
          )
        )
      )
    )
  );

  deleteShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentsActions.deleteShipment),
      mergeMap(({ shipmentId }) =>
        this.shipmentService.deleteShipment(shipmentId).pipe(
          map(() => ShipmentsActions.deleteShipmentSuccess({ shipmentId })),
          catchError(err =>
            of(ShipmentsActions.deleteShipmentFailure({ error: err.message || 'Failed to delete shipment' }))
          )
        )
      )
    )
  );
}