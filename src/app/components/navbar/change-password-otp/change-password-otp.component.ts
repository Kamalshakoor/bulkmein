import { Component,Inject } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../../environment';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-otp',
  templateUrl: './change-password-otp.component.html',
  styleUrls: ['./change-password-otp.component.css']
})
export class ChangePasswordOTPComponent {
  otp_error: string = ""

  constructor(private dialogref: MatDialogRef<ChangePasswordOTPComponent>,private dialog: MatDialog, private api_service: ApiService, private router: Router, private notify: NotificationService, @Inject(MAT_DIALOG_DATA) public data: any) {}

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
          this.notify.proccessSuccessfull("OTP Verification Completed")
          const userData = {
            "password": this.data.password,
            "token": token,
          };
          let updatePassResp = this.api_service.resetPasswordForAuthenticatedUser(userData);
          updatePassResp.then((response)=>{
            if(response.message.includes("success")){
              this.dialogref.close();
            }
          })
        }
      })
    }
  }

  resendOTP(){
    let token = sessionStorage.getItem("forget_token")
    let isUserAuthenticated = true
    let resp = this.api_service.resendOtp(token, isUserAuthenticated);
    resp.then((response)=>{
      console.log(response);
    })
  }
}
