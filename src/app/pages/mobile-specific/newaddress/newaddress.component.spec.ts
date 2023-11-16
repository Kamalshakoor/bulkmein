import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewaddressComponent } from './newaddress.component';

describe('NewaddressComponent', () => {
  let component: NewaddressComponent;
  let fixture: ComponentFixture<NewaddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewaddressComponent]
    });
    fixture = TestBed.createComponent(NewaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
