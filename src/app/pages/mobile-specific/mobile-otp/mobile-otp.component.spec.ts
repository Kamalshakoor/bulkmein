import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOtpComponent } from './mobile-otp.component';

describe('MobileOtpComponent', () => {
  let component: MobileOtpComponent;
  let fixture: ComponentFixture<MobileOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileOtpComponent]
    });
    fixture = TestBed.createComponent(MobileOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
