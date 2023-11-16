import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordOTPComponent } from './change-password-otp.component';

describe('ChangePasswordOTPComponent', () => {
  let component: ChangePasswordOTPComponent;
  let fixture: ComponentFixture<ChangePasswordOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordOTPComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
