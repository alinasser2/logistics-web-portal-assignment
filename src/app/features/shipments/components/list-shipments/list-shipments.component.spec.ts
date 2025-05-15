import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShipmentsComponent } from './list-shipments.component';

describe('ListShipmentsComponent', () => {
  let component: ListShipmentsComponent;
  let fixture: ComponentFixture<ListShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListShipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
