import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddressConfirmationComponent } from './new-address-confirmation.component';

describe('NewAddressConfirmationComponent', () => {
  let component: NewAddressConfirmationComponent;
  let fixture: ComponentFixture<NewAddressConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAddressConfirmationComponent]
    });
    fixture = TestBed.createComponent(NewAddressConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
