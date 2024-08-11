import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-family-details',
  standalone: true,
  imports: [CommonComponent,FormsModule,CommonModule],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.css'
})
export class FamilyDetailsComponent {
@ViewChild(CommonComponent)commonComponent: CommonComponent;

noOfFamilyMemebers: number[] = [1];

addFamilyMember = ()=>{
  let lastFamilyMember = this.noOfFamilyMemebers[this.noOfFamilyMemebers.length - 1];
  this.noOfFamilyMemebers.push(lastFamilyMember + 1);
}

removeFamilyMember = (member:number)=>{
  console.log(member)
  this.noOfFamilyMemebers = this.noOfFamilyMemebers.filter((item)=> item!== member)

}


checkisValid(){
  if( this.commonComponent.checkisValid()){
    return true;
  }
  return false;
}

handleFamilyForm(){

  this.commonComponent.handleCommonForm();

}



}
