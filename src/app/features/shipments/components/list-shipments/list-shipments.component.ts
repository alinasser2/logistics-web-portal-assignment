// features/shipments/components/list-shipments/list-shipments.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';

@Component({
  selector: 'app-list-shipments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-shipments.component.html',
  styleUrls: ['./list-shipments.component.scss']
})
export class ListShipmentsComponent implements OnInit {
  shipments: Shipment[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;
  showCreateForm = false; // Toggle for form visibility
  shipmentForm: FormGroup;
  success = '';

  constructor(private shipmentService: ShipmentService, private fb: FormBuilder) {
    this.shipmentForm = this.fb.group({
      trackingId: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, this.egyptPhoneNumberValidator()]],
      description: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.fetchShipments();
  }

  fetchShipments(page: number = this.currentPage) {
    this.loading = true;
    this.currentPage = page;
    this.shipmentService.getAllShipments(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.shipments = response.items;
        this.totalPages = response.meta.lastPage;
        this.totalItems = response.meta.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load shipments.';
        this.loading = false;
      }
    });
  }

  onCheckout(shipmentId: string) {
    this.shipmentService.checkoutShipment(shipmentId).subscribe({
      next: (updatedShipment) => {
        const index = this.shipments.findIndex(s => s.id === updatedShipment.id);
        if (index !== -1) {
          this.shipments[index] = updatedShipment;
          this.shipments = [...this.shipments];
        }
      },
      error: (err) => {
        this.error = err.message || 'Failed to checkout shipment.';
      }
    });
  }

  onDeliver(shipmentId: string) {
    this.shipmentService.deliverShipment(shipmentId).subscribe({
      next: (updatedShipment) => {
        const index = this.shipments.findIndex(s => s.id === updatedShipment.id);
        if (index !== -1) {
          this.shipments[index] = updatedShipment;
          this.shipments = [...this.shipments];
        }
      },
      error: (err) => {
        this.error = err.message || 'Failed to deliver shipment.';
      }
    });
  }

  onDelete(shipmentId: string) {
    this.shipmentService.deleteShipment(shipmentId).subscribe({
      next: () => {
        this.fetchShipments();
      },
      error: (err) => {
        this.error = err.message || 'Failed to delete shipment.';
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchShipments(page);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.success = ''; // Clear success message when opening form
      this.error = ''; // Clear error message when opening form
    }
  }

  onCreateSubmit() {
    if (this.shipmentForm.valid) {
      const shipmentData = this.shipmentForm.value;
      this.shipmentService.createShipment(shipmentData).subscribe({
        next: () => {
          this.success = 'Shipment created successfully!';
          this.error = '';
          this.shipmentForm.reset();
          this.fetchShipments(); // Refresh the list
          this.showCreateForm = false; // Collapse the form
        },
        error: (err) => {
          this.error = err.message || 'Failed to create shipment.';
          this.success = '';
        }
      });
    }
  }

  // Custom validator for Egyptian phone numbers (e.g., 01XXXXXXXXX or +20XXXXXXXXXX)
  egyptPhoneNumberValidator() {
    return (control: any) => {
      const phoneNumber = control.value;
      const egyptPhoneRegex = /^(?:\+20|0)?1[0125][0-9]{8}$/;
      if (phoneNumber && !egyptPhoneRegex.test(phoneNumber)) {
        return { invalidPhoneNumber: true };
      }
      return null;
    };
  }
}