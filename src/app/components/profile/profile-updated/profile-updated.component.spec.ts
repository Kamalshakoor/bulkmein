import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdatedComponent } from './profile-updated.component';

describe('ProfileUpdatedComponent', () => {
  let component: ProfileUpdatedComponent;
  let fixture: ComponentFixture<ProfileUpdatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileUpdatedComponent]
    });
    fixture = TestBed.createComponent(ProfileUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
