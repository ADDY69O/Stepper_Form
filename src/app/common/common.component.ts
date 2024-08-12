// common.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonInputComponent } from '../common-input/common-input.component';

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [CommonModule, FormsModule,CommonInputComponent],
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent {
  @ViewChild('commonForm') Form: NgForm;
  @Input() member: any;
  @Input() memberIndex: number;
  @Output() sendCommonData: EventEmitter<any> = new EventEmitter();

  constructor(private formService: FormDataService) {}

  Fname: string = '';
  Lname: string = '';
  Phone: number;
  dob: string = '';

  ngOnInit() {
    if (this.member) {
      this.Fname = this.member.Fname || '';
      this.Lname = this.member.Lname || '';
      this.Phone = this.member.Phone || '';
      this.dob = this.member.dob ? new Date(this.member.dob).toISOString().substring(0, 10) : '';
    } else {
      let commonData = this.formService.data.common;
      this.Fname = commonData.Fname || '';
      this.Lname = commonData.Lname || '';
      this.Phone = commonData.Phone || '';
      this.dob = commonData.dob ? new Date(commonData.dob).toISOString().substring(0, 10) : '';
    }
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
    }
  }

  checkisValid() {
    return this.Form.valid;
  }
  
  showError() {
    Object.keys(this.Form.controls).forEach(field => {
      const control = this.Form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }

  handleCommonFamilyForm() {
    if (this.Form.valid) {
      const data = {
        Fname: this.Fname,
        Lname: this.Lname,
        Phone: this.Phone,
        dob: this.dob
      };
      this.sendCommonData.emit(data);
    } else {
      this.showError();
    }
  }
}
