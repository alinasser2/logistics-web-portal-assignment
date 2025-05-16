import { createAction, props } from '@ngrx/store';
import { Shipment } from '../models/shipment.model';
import { ShipmentActionTypes } from './shipment-action-types.enum';

export const loadShipments = createAction(
  ShipmentActionTypes.LoadShipments,
  props<{ page: number; limit: number }>()
);

export const loadShipmentsSuccess = createAction(
  ShipmentActionTypes.LoadShipmentsSuccess,
  props<{ shipments: Shipment[]; currentPage: number; totalPages: number; totalItems: number }>()
);

export const loadShipmentsFailure = createAction(
  ShipmentActionTypes.LoadShipmentsFailure,
  props<{ error: string }>()
);

export const createShipment = createAction(
  ShipmentActionTypes.CreateShipment,
  props<{ shipmentData: { trackingId: string; phoneNumber: string; description: string } }>()
);

export const createShipmentSuccess = createAction(
  ShipmentActionTypes.CreateShipmentSuccess,
  props<{ shipment: Shipment }>()
);

export const createShipmentFailure = createAction(
  ShipmentActionTypes.CreateShipmentFailure,
  props<{ error: string }>()
);

export const checkoutShipment = createAction(
  ShipmentActionTypes.CheckoutShipment,
  props<{ shipmentId: string }>()
);

export const checkoutShipmentSuccess = createAction(
  ShipmentActionTypes.CheckoutShipmentSuccess,
  props<{ shipment: Shipment }>()
);

export const checkoutShipmentFailure = createAction(
  ShipmentActionTypes.CheckoutShipmentFailure,
  props<{ error: string }>()
);

export const deliverShipment = createAction(
  ShipmentActionTypes.DeliverShipment,
  props<{ shipmentId: string }>()
);

export const deliverShipmentSuccess = createAction(
  ShipmentActionTypes.DeliverShipmentSuccess,
  props<{ shipment: Shipment }>()
);

export const deliverShipmentFailure = createAction(
  ShipmentActionTypes.DeliverShipmentFailure,
  props<{ error: string }>()
);

export const deleteShipment = createAction(
  ShipmentActionTypes.DeleteShipment,
  props<{ shipmentId: string }>()
);

export const deleteShipmentSuccess = createAction(
  ShipmentActionTypes.DeleteShipmentSuccess,
  props<{ shipmentId: string }>()
);

export const deleteShipmentFailure = createAction(
  ShipmentActionTypes.DeleteShipmentFailure,
  props<{ error: string }>()
);