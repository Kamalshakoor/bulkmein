import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-profile-sidebar',
  templateUrl: './user-profile-sidebar.component.html',
  styleUrls: ['./user-profile-sidebar.component.css']
})
export class UserProfileSidebarComponent {
  @Input() active: string = '';
  constructor(private router: Router, private notify: NotificationService){}
  Logout(){
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("user_signed_in")
    this.notify.proccessSuccessfull("Successfully Logged Out")
    setTimeout(()=>{
      location.reload()
    }, 1000)
  }
}
