import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  templateUrl: './common-input.component.html',
  standalone:true,
  styleUrls: ['./common-input.component.css'],
  imports:[CommonInputComponent,FormsModule,CommonModule]
})
export class CommonInputComponent {
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() model: any;
  @Input() required: boolean = false;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 0;
  @Input() errorMessage: string = '';
  @Input() lengthErrorMessage: string = '';

  onModelChange(value: any) {
    this.model = value;
    this.modelChange.emit(value);
  }
}