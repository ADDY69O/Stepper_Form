import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent {
@ViewChild ('basicForm') Form : NgForm;

constructor ( ){}
@Input() formInfo:any;

@Output() sendFormData : EventEmitter<any> = new EventEmitter();
Fname:string="";
Lname:string="";
Email:string="";
Phone:number=0;
Website:string=""

ngOnInit() {
  if(this.formInfo ){


    this.Fname = this.formInfo.Fname;
    this.Lname = this.formInfo.Lname;
    this.Email = this.formInfo.Email;
    this.Phone = this.formInfo.Phone;
    this.Website = this.formInfo.Website;
  }

}






 public checkForm(){
  if (this.Form.valid) {
  console.log(this.Form)
  const data = {
    Email : this.Form?.value?.Email,
    Fname : this.Form?.value?.Fname,
    Lname : this.Form?.value?.Lname,
    Phone : this.Form?.value?.Phone,
    Website : this.Form?.value?.Website,

  }
  
  this.sendFormData.emit(data);
  }

}



}
