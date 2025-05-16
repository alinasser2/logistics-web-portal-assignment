// features/shipments/store/shipments.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ShipmentsActions from './shipments.actions';
import { initialShipmentsState } from '../../../core/state/shipments.state';

export const shipmentsReducer = createReducer(
  initialShipmentsState,

  on(ShipmentsActions.loadShipments, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ShipmentsActions.loadShipmentsSuccess, (state, { shipments, currentPage, totalPages, totalItems }) => ({
    ...state,
    loading: false,
    shipments,
    currentPage,
    totalPages,
    totalItems,
    error: null
  })),

  on(ShipmentsActions.loadShipmentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null
  })),

  on(ShipmentsActions.createShipment, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ShipmentsActions.createShipmentSuccess, (state, { shipment }) => ({
    ...state,
    loading: false,
    shipments: [shipment, ...state.shipments], // Add new shipment to the list
    success: 'Shipment created successfully!',
    error: null
  })),

  on(ShipmentsActions.createShipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null
  })),

  on(ShipmentsActions.checkoutShipment, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ShipmentsActions.checkoutShipmentSuccess, (state, { shipment }) => ({
    ...state,
    loading: false,
    shipments: state.shipments.map(s => (s.id === shipment.id ? shipment : s)),
    success: 'Shipment checked out successfully!',
    error: null
  })),

  on(ShipmentsActions.checkoutShipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null
  })),

  on(ShipmentsActions.deliverShipment, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ShipmentsActions.deliverShipmentSuccess, (state, { shipment }) => ({
    ...state,
    loading: false,
    shipments: state.shipments.map(s => (s.id === shipment.id ? shipment : s)),
    success: 'Shipment delivered successfully!',
    error: null
  })),

  on(ShipmentsActions.deliverShipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null
  })),

  on(ShipmentsActions.deleteShipment, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: null
  })),

  on(ShipmentsActions.deleteShipmentSuccess, (state, { shipmentId }) => ({
    ...state,
    loading: false,
    shipments: state.shipments.filter(s => s.id !== shipmentId),
    success: 'Shipment deleted successfully!',
    error: null
  })),

  on(ShipmentsActions.deleteShipmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: null
  }))
);