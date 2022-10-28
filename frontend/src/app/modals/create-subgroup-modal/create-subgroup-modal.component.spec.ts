import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubgroupModalComponent } from './create-subgroup-modal.component';

describe('CreateSubgroupModalComponent', () => {
  let component: CreateSubgroupModalComponent;
  let fixture: ComponentFixture<CreateSubgroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubgroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubgroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
