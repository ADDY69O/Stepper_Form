import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent {
  @ViewChild('commonForm') Form: NgForm;
  @Input() member: any;
  @Input() memberIndex: number;
  @Output() sendCommonData: EventEmitter<any> = new EventEmitter();

  constructor(private formService: FormDataService) {}

  Fname: string;
  Lname: string;
  Phone: number;
  dob: string;

  ngOnInit() {
    if (this.member) {
      this.Fname = this.member.Fname;
      this.Lname = this.member.Lname;
      this.Phone = this.member.Phone;
      if (this.member.dob) {
        const dobDate = new Date(this.member.dob);
        if (!isNaN(dobDate.getTime())) {  // Check if the date is valid
          this.dob = dobDate.toISOString().substring(0, 10);
        } else {
          this.dob = '';  // Handle invalid date case
        }
      } else {
        this.dob = '';  // Handle undefined or empty dob
      }
    }
    else{
     let commonData = this.formService.data.common;
      this.Fname = commonData.Fname;
      this.Lname = commonData.Lname;
      this.Phone = commonData.Phone;
      if(commonData.dob){
        this.dob = new Date(commonData.dob).toISOString().substring(0, 10);
      }
      else{
        this.dob = "";
      }
    }
  }

  consoleCommonFormValues() {
    const data = {
      Fname: this.Fname,
      Lname: this.Lname,
      Phone: this.Phone,
      dob: this.dob
    };
    this.sendCommonData.emit(data);
  }

  checkisValid() {
    return this.Form.valid;
  }

  handleCommonForm() {
    if (this.Form.valid) {
      this.formService.addCommonData(this.Form.value);
    } else {
      Object.keys(this.Form.controls).forEach(field => {
        const control = this.Form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      console.log('Form is not valid');
      console.log('Form is not valid');
    }
  }

  showError (){
    Object.keys(this.Form.controls).forEach(field => {
      const control = this.Form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

  handleCommonFamilyForm() {
    if (this.checkisValid()) {
      const data = {
        Fname: this.Fname,
        Lname: this.Lname,
        Phone: this.Phone,
        dob: this.dob
      };
      console.log(data + "within Common Module") 
      this.sendCommonData.emit(data);
    } else {
      Object.keys(this.Form.controls).forEach(field => {
        const control = this.Form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      console.log('Form is not valid');
    }
  }
}
