import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ChangePasswordOTPComponent } from 'src/app/components/navbar/change-password-otp/change-password-otp.component';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  screenWidth:number;

  constructor(private dialog: MatDialog, private notify: NotificationService, private api_service: ApiService, private router: Router){
    this.screenWidth = window.innerWidth
  }

  ngOnInit(){
    if(!sessionStorage.getItem("user_signed_in")){
      this.router.navigate(['/'])
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.screenWidth = window.innerWidth;
  }

  updateProfile(password: HTMLInputElement, confirmpassword:HTMLInputElement){
    let pass  = password.value.trim();
    let cpass = confirmpassword.value.trim();
    if ( pass == "" || cpass == "" ) {
      this.notify.processNotSuccessfull("Please Fill All Fields")
    }
    else if ( pass != cpass ) {
      this.notify.processNotSuccessfull("Password did not match")
    }
    else if ( pass.length < 6 ) {
      this.notify.processNotSuccessfull("Password Should be more than 5 characters")
    }
    else{
      let resp = this.api_service.sendOTPForAuthenticatedUser();
      resp.then((response)=>{
        if(response.message.includes("Success")){
          sessionStorage.setItem("forget_token", response.token);
          this.dialog.open(ChangePasswordOTPComponent, {
            data: { password: pass }
          })
        }else{
          this.notify.processNotSuccessfull(response.message)
        }
      })
    }
  }
}
