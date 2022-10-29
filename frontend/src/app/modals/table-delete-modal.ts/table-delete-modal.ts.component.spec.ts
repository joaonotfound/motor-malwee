import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDeleteModalTsComponent } from './table-delete-modal.ts.component';

describe('TableDeleteModalTsComponent', () => {
  let component: TableDeleteModalTsComponent;
  let fixture: ComponentFixture<TableDeleteModalTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDeleteModalTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDeleteModalTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
