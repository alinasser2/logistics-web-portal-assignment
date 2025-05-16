import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { Shipment } from '../../models/shipment.model';
import {
  loadShipments,
  createShipment,
  checkoutShipment,
  deliverShipment,
  deleteShipment
} from '../../store/shipments.actions';
import {
  selectAllShipments,
  selectLoading,
  selectError,
  selectSuccess,
  selectPagination
} from '../../store/shipments.selectors';

@Component({
  selector: 'app-list-shipments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-shipments.component.html',
  styleUrls: ['./list-shipments.component.scss']
})
export class ListShipmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  shipments$!: Observable<Shipment[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  success$!: Observable<string | null>;
  pagination$!: Observable<{ currentPage: number; totalPages: number; totalItems: number }>;

  pageSize = 10;
  showCreateForm = false;
  shipmentForm: FormGroup;

  constructor() {
    this.shipmentForm = this.fb.group({
      trackingId: ['', [Validators.required, Validators.minLength(1)]],
      phoneNumber: ['', [Validators.required, this.egyptPhoneNumberValidator()]],
      description: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.shipments$ = this.store.select(selectAllShipments);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.success$ = this.store.select(selectSuccess);
    this.pagination$ = this.store.select(selectPagination);
    this.store.dispatch(loadShipments({ page: 1, limit: this.pageSize }));
  }



  onCheckout(shipmentId: string) {
    this.store.dispatch(checkoutShipment({ shipmentId }));
  }

  onDeliver(shipmentId: string) {
    this.store.dispatch(deliverShipment({ shipmentId }));
  }

  onDelete(shipmentId: string) {
    this.store.dispatch(deleteShipment({ shipmentId }));
  }

  goToPage(page: number) {
    this.store.dispatch(loadShipments({ page, limit: this.pageSize }));
  }

  previousPage() {
    this.pagination$.pipe(take(1)).subscribe(({ currentPage }) => {
      if (currentPage > 1) {
        this.goToPage(currentPage - 1);
      }
    });
  }

  nextPage() {
    this.pagination$.pipe(take(1)).subscribe(({ currentPage, totalPages }) => {
      if (currentPage < totalPages) {
        this.goToPage(currentPage + 1);
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (this.showCreateForm) {
      this.shipmentForm.reset();
    }
  }

  onCreateSubmit() {
    if (this.shipmentForm.valid) {
      const shipmentData = this.shipmentForm.value;
      this.store.dispatch(createShipment({ shipmentData }));
      this.success$.pipe(take(1)).subscribe((success) => {
        if (success) {
          this.shipmentForm.reset();
          this.showCreateForm = false;
        }
      });
    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }


  private egyptPhoneNumberValidator() {
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