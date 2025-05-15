// features/shipments/services/shipment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Shipment } from '../models/shipment.model';

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
  private readonly baseUrl = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  getAllShipments(page: number = 1, limit: number = 10): Observable<ShipmentsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.baseUrl}/`, { params }).pipe(
      map((response) => ({
        items: response.data.items,
        meta: response.data.meta
      }))
    );
  }

  checkoutShipment(id: string): Observable<Shipment> {
    return this.http.patch<any>(`${this.baseUrl}/${id}/checkout`, {}).pipe(
      map((response) => {
        if (response.statusCode !== 200) {
          throw new Error(response.message || 'Failed to checkout shipment');
        }
        return response.data;
      })
    );
  }

  deliverShipment(id: string): Observable<Shipment> {
    return this.http.patch<any>(`${this.baseUrl}/${id}/deliver`, {}).pipe(
      map((response) => {
        if (response.statusCode !== 200) {
          throw new Error(response.message || 'Failed to deliver shipment');
        }
        return response.data;
      })
    );
  }

  deleteShipment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/shipments/${id}`).pipe(
      map(() => {})
    );
  }

  createShipment(shipmentData: { trackingId: string; phoneNumber: string; description: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/`, shipmentData).pipe(
      map((response) => {
        if (response.statusCode !== 200 && response.statusCode !== 201) {
          throw new Error(response.message || 'Failed to create shipment');
        }
        return response;
      })
    );
  }
}