import { Component,ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mobile-create-account',
  templateUrl: './mobile-create-account.component.html',
  styleUrls: ['./mobile-create-account.component.css']
})
export class CreateAccountComponent {
  form_error:string = ""

  constructor(private api_service: ApiService, private notify:NotificationService) {}


  closeDialog(){
    // this.dialogref.close();
  }

  onFileChange(event: any, controlName: string) {
    const files = event.target.files;
    if (files.length > 0) {
      // this.form.get(controlName)?.setValue(files[0]);
    }
  }

  // onSubmit() {
  //   this.form_error = ""
  //   if (this.form.invalid) {
  //     this.form_error = "Please Fill all fields"
  //     return;
  //   }

  //   const formData = new FormData();
  //   const {
  //     full_name,
  //     company_name,
  //     fsai,
  //     password
  //   } = this.form.value;

  //   let token = sessionStorage.getItem("signup_token")

  //   let body = {
  //     "companyName": company_name,
  //     "name": full_name,
  //     "password": password,
  //     "fssai": fsai,
  //     "token" : token
  //   };
  //   const gstInput = document.getElementById("gst") as HTMLInputElement;
  //   const panInput = document.getElementById("pan") as HTMLInputElement;
    
  //   if (gstInput && gstInput.files && gstInput.files.length > 0) {
  //     formData.append("gst", gstInput.files[0]);
  //   }
  //   if (panInput && panInput.files && panInput.files.length > 0) {
  //     formData.append("panCard", panInput.files[0]);
  //   }
    
  //   formData.append("signUpData", JSON.stringify(body));
  //   let resp = this.api_service.createAccount(formData);
  //   resp.then((response)=>{
  //     if(response.message.includes("Success")){
  //       this.dialogref.close()
  //       Swal.fire({
  //         icon: "success",
  //         title: "Registration Successful!!",
  //         text: "Will send the notification once the account is activated",
  //         confirmButtonColor: '#198754',
  //         confirmButtonText: 'OK'
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           window.location.href = "./index.html";
  //         }
  //       });
  //     }
  //   })
  // }

}