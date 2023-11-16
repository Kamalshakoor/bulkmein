import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token:any = null

  error = ""
  constructor(private notify: NotificationService, private router: Router, private api_service: ApiService){}
  
  ngOnInit(){
    this.token = sessionStorage.getItem("forget_token");
  }

  resetPassword(password:HTMLInputElement, cpassword:HTMLInputElement){
    const pass = password.value.trim();
    const cpass = cpassword.value.trim();
    if(pass == "" || cpass == ""){
      this.error = "Please Enter a Password"
    }
    else if(pass != cpass){
      this.error = "Password did not match";
    }else if(pass.length <6){
      this.error = "Password Should be more than 5 digits"
    }
    else{
      this.error = ""
      if ( this.token != null || this.token != "" || this.token != undefined ){
        const userData = {
          "password": pass,
          "token": this.token,
        };
        let resp = this.api_service.resetPasswordForNonAuthenticatedUser(userData);
        
      }else{
        this.router.navigate(["/"])
      }
    }
  }
}
