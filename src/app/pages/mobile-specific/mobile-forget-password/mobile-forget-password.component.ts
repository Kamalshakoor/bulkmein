import { DialogRef } from '@angular/cdk/dialog';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomValidatorsService } from '../../../services/validators/custom-validators.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-mobile-forget-password',
  templateUrl: './mobile-forget-password.component.html',
  styleUrls: ['./mobile-forget-password.component.css']
})
export class MobileForgetPasswordComponent {
  @ViewChild('email') email: ElementRef | undefined;
  constructor(private custom_validator: CustomValidatorsService, private router:Router, private api_servise: ApiService, private notify: NotificationService) {}
  email_error:string = ""

  sendPasswordResetLink(email:HTMLInputElement){
    this.email_error = ""
    let u_email = email.value.trim();
    if(u_email == ""){
      this.email_error = "Email is required for password reset"
    }
    else if(this.custom_validator.validate_email(u_email) != 1){
      this.email_error = "Please enter a valid email address"
    }
    else{
      let resp = this.api_servise.forgetPasswordForNonAuthenticatedUser(u_email);
      resp.then((response)=>{
        if(response.message.includes("Success")){
          this.notify.proccessSuccessfull(response.message);
          this.router.navigate(["/verify-otp"])
          sessionStorage.setItem("forget_token", response.token)
        }
      })
    }
  }

}
