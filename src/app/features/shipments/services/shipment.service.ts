// features/shipments/services/shipment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Shipment } from '../../../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<any>(`${this.baseUrl}/shipments`).pipe(
      map((response) => response.data.items)
    );
  }
}
