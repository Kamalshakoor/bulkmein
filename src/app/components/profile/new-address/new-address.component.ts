import { Component } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators,AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent {
  form:any =  FormGroup;
  isCountryInputDisabled: boolean = true; 
  error = ""

  constructor(private dialogref: MatDialogRef<NewAddressComponent>,private fb: FormBuilder, private notify: NotificationService, private api_service: ApiService) {}
  closeDialog(){
    this.dialogref.close();
  }
  
  ngOnInit(){
    this.form = this.fb.group({
      fullname: ['', Validators.required],
      house_no: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pin_code: ['', Validators.required],
      landmark: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  onSubmit(){
    this.error = ""
    if (this.form.get('fullname').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('house_no').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('area').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('city').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('pin_code').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('landmark').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else if (this.form.get('state').hasError('required')) {
      this.error = "Please Fill All Fields";
    }else{
      const userData = {
        fullName: this.form.get('fullname').value,
        houseNumber: this.form.get('house_no').value,
        area: this.form.get('area').value,
        city: this.form.get('city').value,
        pinCode: this.form.get('pin_code').value,
        landmark: this.form.get('landmark').value,
        state: this.form.get('state').value,
        country: "India"
    };
    let resp = this.api_service.addNewAddress(userData);
    resp.then((response)=>{
      if(response.message.includes("success")){
        this.dialogref.close()
        this.notify.proccessSuccessfull("New Address Created")
        setTimeout(()=>{
          location.reload()
        }, 2000)
      }
    })
    }
  }
}
