import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupModalComponent } from './subgroup-modal.component';

describe('CreateSubgroupModalComponent', () => {
  let component: SubgroupModalComponent;
  let fixture: ComponentFixture<SubgroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubgroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubgroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
