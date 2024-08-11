import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { CommonComponent } from '../common/common.component';



@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [FormsModule,CommonModule,CommonComponent],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent {
@ViewChild ('basicForm') Form : NgForm;

constructor (private formService:FormDataService ){}


@ViewChild (CommonComponent) commonComponent: CommonComponent;

Email:string;
Website:string;

ngOnInit() {
  console.log("ng init called")
   const basicData = this.formService.data.basicDetails;

    this.Email = basicData.Email;
    this.Website = basicData.Website;
  }


  checkisValid(){
    if(this.Form.valid && this.commonComponent.checkisValid()){
      return true;
    }
    return false;
  }


  handleBasicForm(){
  if (this.Form.valid) {
  console.log(this.Form)
  const data = {
    Email : this.Form?.value?.Email,
    Website : this.Form?.value?.Website,

  }
  this.formService.addBasicData(data);
  this.commonComponent.handleCommonForm();  
  
}
else{
  console.log(this.Form.controls)
  Object.keys(this.Form.controls).forEach(field => {
    let control = this.Form.controls[field];
    control.markAsTouched({ onlySelf: true });
  });
  this.commonComponent.handleCommonForm();
  console.log("form is not valid")
}

}



}
