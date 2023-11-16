import { Component,ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-mobile-otp',
  templateUrl: './mobile-otp.component.html',
  styleUrls: ['./mobile-otp.component.css']
})
export class MobileOtpComponent {
  @ViewChild('otp') password: ElementRef | undefined;

  otp_error: string = ""

  constructor(private api_service: ApiService, private router: Router, private notify: NotificationService) {}

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
