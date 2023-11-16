import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileSidebarComponent } from './user-profile-sidebar.component';

describe('UserProfileSidebarComponent', () => {
  let component: UserProfileSidebarComponent;
  let fixture: ComponentFixture<UserProfileSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileSidebarComponent]
    });
    fixture = TestBed.createComponent(UserProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
