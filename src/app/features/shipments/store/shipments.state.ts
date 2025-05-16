// features/shipments/store/shipments.state.ts
import { Shipment } from '../models/shipment.model';

export interface ShipmentsState {
  shipments: Shipment[];
  loading: boolean;
  error: string | null;
  success: string | null; // Added for success messages
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const initialShipmentsState: ShipmentsState = {
  shipments: [],
  loading: false,
  error: null,
  success: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
};