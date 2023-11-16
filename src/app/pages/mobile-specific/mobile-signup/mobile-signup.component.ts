import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomValidatorsService } from 'src/app/services/validators/custom-validators.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-signup',
  templateUrl: './mobile-signup.component.html',
  styleUrls: ['./mobile-signup.component.css']
})
export class MobileSignupComponent {
  constructor( private dialog: MatDialog, private custom_validator: CustomValidatorsService, private api_service:ApiService, private router: Router) {}
  phone_error:string = ""
  email_error:string = ""

  @ViewChild('phone') password: ElementRef | undefined;
  @ViewChild('email') email: ElementRef | undefined;

  signup(phone: HTMLInputElement, email: HTMLInputElement){
    this.phone_error = ""
    this.email_error = ""

    let u_phone = phone.value.trim();
    let u_email = email.value.trim();

    if(u_phone == "" && u_email == ""){
      this.phone_error = "Phone Number is required"
      this.email_error = "Email is Required"
    }
    else if(u_phone == ""){
      this.phone_error = "Phone Number is required"
    }
    else if(u_phone.length<10){
      this.phone_error = "Phone Number Should be At least 10 digit"
    }
    else if (u_email == ""){
      this.email_error = "Email is Required"
    }
    else if(this.custom_validator.validate_email(u_email) != 1){
      this.email_error = "Please Enter a Valid Email"
    }
    else{
      const userData = {
        "email": u_email,
        "phoneNumber": `+91-${u_phone}`,
      };

      const resp = this.api_service.signup(userData)
      resp.then((response)=>{
        if (response.token != null || response.token != undefined) {
          sessionStorage.setItem("signup_token", response.token);
          this.router.navigate(["/verify-otp"])
        }
      })
    }
  }

}
