// features/shipments/store/shipments.actions.ts
import { createAction, props } from '@ngrx/store';
import { Shipment } from '../models/shipment.model';

export const loadShipments = createAction(
  '[Shipments] Load Shipments',
  props<{ page: number; limit: number }>()
);

export const loadShipmentsSuccess = createAction(
  '[Shipments] Load Shipments Success',
  props<{ shipments: Shipment[]; currentPage: number; totalPages: number; totalItems: number }>()
);

export const loadShipmentsFailure = createAction(
  '[Shipments] Load Shipments Failure',
  props<{ error: string }>()
);

export const createShipment = createAction(
  '[Shipments] Create Shipment',
  props<{ shipmentData: { trackingId: string; phoneNumber: string; description: string } }>()
);

export const createShipmentSuccess = createAction(
  '[Shipments] Create Shipment Success',
  props<{ shipment: Shipment }>()
);

export const createShipmentFailure = createAction(
  '[Shipments] Create Shipment Failure',
  props<{ error: string }>()
);

export const checkoutShipment = createAction(
  '[Shipments] Checkout Shipment',
  props<{ shipmentId: string }>()
);

export const checkoutShipmentSuccess = createAction(
  '[Shipments] Checkout Shipment Success',
  props<{ shipment: Shipment }>()
);

export const checkoutShipmentFailure = createAction(
  '[Shipments] Checkout Shipment Failure',
  props<{ error: string }>()
);

export const deliverShipment = createAction(
  '[Shipments] Deliver Shipment',
  props<{ shipmentId: string }>()
);

export const deliverShipmentSuccess = createAction(
  '[Shipments] Deliver Shipment Success',
  props<{ shipment: Shipment }>()
);

export const deliverShipmentFailure = createAction(
  '[Shipments] Deliver Shipment Failure',
  props<{ error: string }>()
);

export const deleteShipment = createAction(
  '[Shipments] Delete Shipment',
  props<{ shipmentId: string }>()
);

export const deleteShipmentSuccess = createAction(
  '[Shipments] Delete Shipment Success',
  props<{ shipmentId: string }>()
);

export const deleteShipmentFailure = createAction(
  '[Shipments] Delete Shipment Failure',
  props<{ error: string }>()
);