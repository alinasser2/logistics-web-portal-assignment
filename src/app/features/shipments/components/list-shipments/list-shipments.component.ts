import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../../../models/shipment.model';

@Component({
  selector: 'app-list-shipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-shipments.component.html',
  styleUrls: ['./list-shipments.component.scss']
})
export class ListShipmentsComponent implements OnInit {
  shipments: Shipment[] = [];
  loading = true;
  error = '';

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.fetchShipments();
    console.log('ListShipmentsComponent initialized', this.shipments);
  }

  fetchShipments() {
    this.loading = true;
    this.shipmentService.getAllShipments().subscribe({
      next: (data) => {
        this.shipments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load shipments.';
        this.loading = false;
      }
    });
  }
}
