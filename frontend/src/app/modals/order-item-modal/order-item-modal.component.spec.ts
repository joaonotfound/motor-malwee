import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemModalComponent } from './order-item-modal.component';

describe('OrderItemModalComponent', () => {
  let component: OrderItemModalComponent;
  let fixture: ComponentFixture<OrderItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
