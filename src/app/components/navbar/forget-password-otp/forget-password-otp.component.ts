import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-forget-password-otp',
  templateUrl: './forget-password-otp.component.html',
  styleUrls: ['./forget-password-otp.component.css']
})
export class ForgetPasswordOTPComponent {
  @ViewChild('otp') password: ElementRef | undefined;

  otp_error: string = ""

  constructor(private dialogref: MatDialogRef<ForgetPasswordOTPComponent>,private dialog: MatDialog, private api_service: ApiService, private router: Router, private notify: NotificationService) {}

  closeDialog(){
    this.dialogref.close();
  }

  verifyOTP(otp: HTMLInputElement){
    let u_otp = otp.value.trim();
    if(u_otp == ""){
      this.otp_error = "Please Enter OTP Sent to your Email/Phone Number"
    }else{
      let token = sessionStorage.getItem("forget_token")
      let resp = this.api_service.VerifyOTPForNonAuthenticatedForgetPassword(u_otp, token);
      resp.then((response)=>{
        if(response.message.includes("Success")){
          this.notify.proccessSuccessfull("OTP Verification Successfull")
          this.dialogref.close()
          setTimeout(()=>{
            this.router.navigate(["/reset-password"])
          }, 1200)
        }
      })
    }
  }

  resendOTP(){
    let token = sessionStorage.getItem("forget_token")
    let isUserAuthenticated = false
    let resp = this.api_service.resendOtp(token, isUserAuthenticated);
    resp.then((response)=>{
      console.log(response);
    })
  }

}
