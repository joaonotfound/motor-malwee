import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersItemComponent } from './order-item.component';

describe('OrderItemComponent', () => {
  let component: OrdersItemComponent;
  let fixture: ComponentFixture<OrdersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
