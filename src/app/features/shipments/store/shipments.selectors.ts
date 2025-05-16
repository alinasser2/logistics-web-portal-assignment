// features/shipments/store/shipments.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShipmentsState } from '../../../core/state/shipments.state';

export const selectShipmentsState = createFeatureSelector<ShipmentsState>('shipments');

export const selectAllShipments = createSelector(
  selectShipmentsState,
  (state) => state.shipments
);

export const selectLoading = createSelector(
  selectShipmentsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectShipmentsState,
  (state) => state.error
);

export const selectSuccess = createSelector(
  selectShipmentsState,
  (state) => state.success
);

export const selectPagination = createSelector(
  selectShipmentsState,
  ({ currentPage, totalPages, totalItems }) => ({ currentPage, totalPages, totalItems })
);