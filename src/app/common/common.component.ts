import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common.component.html',
  styleUrl: './common.component.css'
})
export class CommonComponent {

  @Output() sendCommonData : EventEmitter<any> = new EventEmitter(); 

  constructor (private formService:FormDataService){}

Fname:string;
Lname:string;
Phone:number;
dob:Date;

ngOnInit (){
  const formData = this.formService?.data?.common;
  if(formData){
    this.Fname = formData?.Fname;
    this.Lname = formData?.Lname;
    if(formData.dob !== null){
      this.Phone = formData?.Phone;}
    if(formData.Phone!== null){
      this.dob = formData?.Phone;
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


handleCommonForm( Form:NgForm ){

  console.log(Form);


}

}
