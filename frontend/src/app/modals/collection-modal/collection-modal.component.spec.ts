import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionModalComponent } from './collection-modal.component';

describe('CreateCollectionModalComponent', () => {
  let component: CollectionModalComponent;
  let fixture: ComponentFixture<CollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
