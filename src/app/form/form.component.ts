import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pageType } from '../modal/pagesTypes';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { CreativeComponent } from '../creative/creative.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { ResultComponent } from '../result/result.component';
import { AddressComponent } from '../address/address.component';
import { CommonComponent } from '../common/common.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,FormsModule,BasicDetailsComponent,CreativeComponent,FamilyDetailsComponent,ResultComponent,AddressComponent,CommonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  {

  @ViewChild (BasicDetailsComponent) BasicDetailComponent: BasicDetailsComponent;
  @ViewChild (FamilyDetailsComponent) FamilyDetailsComponent: FamilyDetailsComponent;
  @ViewChild (CreativeComponent) CreativeComponent: CreativeComponent;
  @ViewChild (AddressComponent) AddressComponent: AddressComponent;

  constructor(private toastr: ToastrService) {}

 selected:number =1;
 pages:number[] =[1,2,3,4,5]
 stepperPages:pageType[]=[
  {page:1,title:"Basic Details"},
  {page:2,title:"Family Details"},
  {page:3,title:"Creative"},
  {page:4,title:"Address"},
  {page:5,title:"Submission"},
 ]
 isValid:boolean = false;

  data ={

    basicDetails :{
      Email : "",
      Fname : "",
      Lname : "",
      Phone : 0,
      Website : "",
    }

 }


 updateBasicDetails(data:any){
  console.log(data);
  this.data.basicDetails = data;
 }

 showFormDetails (data:any){
  console.log("Inside Parent COmponent")
  console.log(data);
 }

 handleNextPage = ()=>{
  
  if(this.stepperPages[this.selected-1].title == "Family Details"){
    if(this.FamilyDetailsComponent.checkisValid()){

      this.FamilyDetailsComponent.handleFamilyForm();
    }
    else{
      this.FamilyDetailsComponent.handleFamilyForm();
      this.toastr.error('Form is not valid','Error');
      return;
    }
  }
  else if(this.stepperPages[this.selected-1].title == "Basic Details"){
    if(this.BasicDetailComponent.checkisValid()){

      this.BasicDetailComponent.handleBasicForm();
    

    }
    else{
      this.BasicDetailComponent.handleBasicForm();
      this.toastr.error('Form is not valid','Error');
      console.log("Form is not Valid")

      return;
    }
  }
  else if(this.stepperPages[this.selected-1].title == "Creative"){
    if(!this.CreativeComponent.validatePhotos()){
      this.toastr.error('Required to upload all of the photos','Error');
      return;
    }
    
  }
  else if(this.stepperPages[this.selected-1].title == "Address"){
    if(!this.AddressComponent.validateAddress()){
      this.toastr.error('Required to select the address','Error');
      return;
    }
    
  }
 
  this.selected += 1;


 }


}
