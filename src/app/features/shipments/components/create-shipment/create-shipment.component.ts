// features/shipments/create-shipment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-shipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit {
  shipmentForm: FormGroup;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private router: Router
  ) {
    this.shipmentForm = this.fb.group({
      trackingId: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, this.egyptPhoneNumberValidator()]],
      description: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.shipmentForm.valid) {
      const shipmentData = this.shipmentForm.value;
      this.shipmentService.createShipment(shipmentData).subscribe({
        next: () => {
          this.success = 'Shipment created successfully!';
          this.error = '';
          this.shipmentForm.reset();
          setTimeout(() => this.router.navigate(['/shipments']), 2000); // Redirect after 2 seconds
        },
        error: (err) => {
          console.error();
          this.error = err.error.errorResponse.message || 'Failed to create shipment.';
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