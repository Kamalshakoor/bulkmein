import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordOTPComponent } from './forget-password-otp.component';

describe('ForgetPasswordOTPComponent', () => {
  let component: ForgetPasswordOTPComponent;
  let fixture: ComponentFixture<ForgetPasswordOTPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordOTPComponent]
    });
    fixture = TestBed.createComponent(ForgetPasswordOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
