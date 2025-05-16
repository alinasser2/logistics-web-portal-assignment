import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Shipment } from '../models/shipment.model';
import { HttpParams } from '@angular/common/http';

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

interface ShipmentsResponse {
  items: Shipment[];
  meta: PaginationMeta;
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private readonly endpoint = '/shipments'; 

  constructor(private apiService: ApiService) {}

  /**
   * Get all shipments with pagination
   * @param page Page number (default: 1)
   * @param limit Items per page (default: 10)
   * @returns Observable of ShipmentsResponse
   */
  getAllShipments(page: number = 1, limit: number = 10): Observable<ShipmentsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.apiService.get<any>(this.endpoint, { params }).pipe(
      map((response) => ({
        items: response.data.items,
        meta: response.data.meta
      }))
    );
  }

  /**
   * Checkout a shipment
   * @param id Shipment ID
   * @returns Observable of updated Shipment
   */
  checkoutShipment(id: string): Observable<Shipment> {
    return this.apiService.patch<any>(`${this.endpoint}/${id}/checkout`, {}).pipe(
      map((response) => {
        if (response.statusCode !== 200) {
          throw new Error(response.message || 'Failed to checkout shipment');
        }
        return response.data;
      })
    );
  }

  /**
   * Deliver a shipment
   * @param id Shipment ID
   * @returns Observable of updated Shipment
   */
  deliverShipment(id: string): Observable<Shipment> {
    return this.apiService.patch<any>(`${this.endpoint}/${id}/deliver`, {}).pipe(
      map((response) => {
        if (response.statusCode !== 200) {
          throw new Error(response.message || 'Failed to deliver shipment');
        }
        return response.data;
      })
    );
  }

  /**
   * Delete a shipment
   * @param id Shipment ID
   * @returns Observable of void
   */
  deleteShipment(id: string): Observable<void> {
    return this.apiService.delete<void>(`${this.endpoint}/${id}`).pipe(
      map(() => {})
    );
  }

  /**
   * Create a new shipment
   * @param shipmentData Shipment data
   * @returns Observable of the API response
   */
  createShipment(shipmentData: { trackingId: string; phoneNumber: string; description: string }): Observable<any> {
    return this.apiService.post<any>(this.endpoint, shipmentData).pipe(
      map((response) => {
        console.log('asdasdasd', response);
        if (response.statusCode !== 200 && response.statusCode !== 201) {
          throw new Error(response || 'Failed to create shipment');
        }
        return response;
      })
    );
  }
}