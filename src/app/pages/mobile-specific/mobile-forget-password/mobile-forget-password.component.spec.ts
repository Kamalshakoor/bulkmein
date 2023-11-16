import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileForgetPasswordComponent } from './mobile-forget-password.component';

describe('MobileForgetPasswordComponent', () => {
  let component: MobileForgetPasswordComponent;
  let fixture: ComponentFixture<MobileForgetPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileForgetPasswordComponent]
    });
    fixture = TestBed.createComponent(MobileForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
