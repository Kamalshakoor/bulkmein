import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { environment } from './../../../../environment';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  @ViewChild('otp') password: ElementRef | undefined;

  otp_error: string = ""

  constructor(private dialogref: MatDialogRef<OtpComponent>,private dialog: MatDialog, private api_service: ApiService) {}


  closeDialog(){
    this.dialogref.close();
  }


  verifyOTP(otp: HTMLInputElement){
    let u_otp = otp.value.trim();
    if(u_otp == ""){
      this.otp_error = "Please Enter OTP Sent to your Email/Phone Number"
    }else{
      let token = sessionStorage.getItem("signup_token");
      let resp = this.api_service.VerifyOtpForNonAuthenticatedUser(u_otp, token);
      resp.then((response)=>{
        //OTP HAS BEEN VERIFIED, Now Move to Create Account

        this.dialogref.close();
        this.dialog.open(CreateAccountComponent)
      })
    }
  }


  resendOTP(){
    let token = "8942y3hurwjbfswdjkhdn2whdw89wi"
    let endpoint = `${environment.apiUrl}resendOtp?token=${token}`
    fetch(endpoint).then(response=>{
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log("OTP sendding failes", err)
    })
  }


}
