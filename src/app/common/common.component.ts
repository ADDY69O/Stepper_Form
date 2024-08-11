import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { __values } from 'tslib';
@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent {
  @ViewChild ('commonForm') Form : NgForm;
  @Output() sendCommonData : EventEmitter<any> = new EventEmitter(); 

  constructor (private formService:FormDataService){}

Fname:string;
Lname:string;
Phone:number;
dob:string;

ngOnInit (){
  console.log("called ng init")
  const formData = this.formService?.data?.common;
  if(formData){
    this.Fname = formData?.Fname;
    this.Lname = formData?.Lname;
    if(formData.Phone !== null){
      this.Phone = formData?.Phone;
    }
    if(formData.dob !== null){
    this.dob = new Date(formData.dob).toISOString().substring(0, 10);
    }
  }
}



consoleCommonFormValues (){
  
  console.log(this.Fname)
  console.log(this.Lname)
  console.log(this.Phone)
  console.log(this.dob)
  const data ={
    Fname:this.Fname,
    Lname:this.Lname,
    Phone:this.Phone,
    dob:this.dob
  }


  this.sendCommonData.emit(data);



}

checkisValid(){
  if(this.Form.valid){
    return true;
  }
  return false;
}

handleCommonForm(  ){
  if(this.Form.valid){

    console.log(this.Form.value , "inside common");
    this.formService.addCommonData(this.Form.value)
    // this.sendCommonData.emit(this.Form.value);
  }
  else{
    console.log("Form is not valid")
  }

}

}
