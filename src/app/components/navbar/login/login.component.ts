import { Component,ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { ApiService } from './../../../services/api/api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form:any =  FormGroup;
  error:string = ""
  password:any;

  show = false;
  constructor(private dialogref: MatDialogRef<LoginComponent>, private dialog: MatDialog , private fb: FormBuilder, private api_service: ApiService, private router: Router, private notify: NotificationService) {}

  ngOnInit() {
    this.password = 'password';
    this.error = "";
    this.form = this.fb.group({
      username: ['', Validators.required, ],
      password: ['', Validators.required],
      remember: ['']
    });
  }
 onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
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
        this.dialogref.close(LoginComponent)
        this.notify.loginSuccessfull();
        setTimeout(()=>{
          location.reload();
        }, 1500)
      }
    })
  }


  toggleAuth(event: any){
    event = event.target;
    this.dialogref.close();
    this.dialog.open(SignupComponent)
  }

  forgetPassword(){
    this.dialogref.close();
    this.dialog.open(ForgetPasswordComponent)
  }


  closeDialog(): void {
    this.dialogref.close();
  }
}
