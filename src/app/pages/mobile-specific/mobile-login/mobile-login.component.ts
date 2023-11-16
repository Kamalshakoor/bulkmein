import { Component,ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MobileSignupComponent } from '../mobile-signup/mobile-signup.component';
import { ForgetPasswordComponent } from 'src/app/components/navbar/forget-password/forget-password.component';
import { ApiService } from './../../../services/api/api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css']
})
export class MobileLoginComponent {
  form:any =  FormGroup;
  error:string = ""

  constructor( private fb: FormBuilder, private api_service: ApiService, private router: Router, private notify: NotificationService) {
  }

  ngOnInit() {
    this.error = "";
    this.form = this.fb.group({
      username: ['', Validators.required, ],
      password: ['', Validators.required],
      remember: ['']
    });
  }


  onSubmit(){
    if (this.form.get('username').hasError('required')) {
      this.error = "Please Fill All Fields";
    }

    if (this.form.get('password').hasError('required')) {
      this.error = "Please Fill All Fields";
    }
  
    if (this.form.invalid) {
      return;
    }
      
    const userData = {
        userName: this.form.get("username").value,
        password: this.form.get("password").value
    };

    const resp = this.api_service.login(userData)

    resp.then((response) => {
      let response_msg = response.message.toLowerCase();
      if(response_msg.includes("password") || response_msg.includes("email")){
        this.notify.invalidLogin(response.message)
      }else if (response_msg.includes("success")){
        sessionStorage.setItem("accessToken",response.accessToken)
        sessionStorage.setItem("user_signed_in", "true")
        this.notify.loginSuccessfull();
        setTimeout(()=>{
          location.href="/"
        }, 1500)
      }
    })
  }


}
