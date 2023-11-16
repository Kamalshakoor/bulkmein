import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOrdersComponent } from './bulk-orders.component';

describe('BulkOrdersComponent', () => {
  let component: BulkOrdersComponent;
  let fixture: ComponentFixture<BulkOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkOrdersComponent]
    });
    fixture = TestBed.createComponent(BulkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
