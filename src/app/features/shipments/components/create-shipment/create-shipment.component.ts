import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { createShipment } from '../../store/shipments.actions';
import { selectError, selectSuccess } from '../../store/shipments.selectors';

@Component({
  selector: 'app-create-shipment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  shipmentForm: FormGroup;
  error$!: Observable<string | null>;
  success$!: Observable<string | null>;

  constructor() {
    this.shipmentForm = this.fb.group({
      trackingId: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, this.egyptPhoneNumberValidator()]],
      description: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    // Initialize selectors
    this.error$ = this.store.select(selectError);
    this.success$ = this.store.select(selectSuccess);
  }

  onSubmit() {
    if (this.shipmentForm.valid) {
      const shipmentData = this.shipmentForm.value;
      // Dispatch createShipment action
      this.store.dispatch(createShipment({ shipmentData }));
      // Subscribe to success$ to handle success case
      this.success$.pipe(take(1)).subscribe((success) => {
        if (success) {
          this.shipmentForm.reset();
          setTimeout(() => this.router.navigate(['/shipments']), 2000); // Redirect after 2 seconds
        }
      });
      // Subscribe to error$ to handle error case (optional, can also be handled in template)
      this.error$.pipe(take(1)).subscribe((error) => {
        if (error) {
          console.error('Shipment creation error:', error);
        }
      });
    } else {
      this.shipmentForm.markAllAsTouched();
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