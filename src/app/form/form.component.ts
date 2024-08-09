import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { pageType } from '../modal/pagesTypes';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { CreativeComponent } from '../creative/creative.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { ResultComponent } from '../result/result.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,FormsModule,BasicDetailsComponent,CreativeComponent,FamilyDetailsComponent,ResultComponent,AddressComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent  {

@ViewChild('basicCmp') basicCmp: BasicDetailsComponent;

 selected:number =1;
 pages:number[] =[1,2,3,4,5]
 stepperPages:pageType[]=[
  {page:1,title:"Basic Details"},
  {page:2,title:"Family Details"},
  {page:3,title:"Creative"},
  {page:4,title:"Address"},
  {page:5,title:"Submission"},
 ]

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


 handleNextPage = ()=>{
  
  if(this.stepperPages[this.selected-1].title == "Family Details"){
    this.basicCmp.checkForm();
  }
  this.selected += 1;


 }


}
