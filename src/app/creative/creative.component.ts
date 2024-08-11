import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.css'
})
export class CreativeComponent {

  familyDetails = [
    { Fname:"Mehra",
      Lname:"Kr",
      Phone:1234567890,
      dob:"13-01-2001",
      relation:"Father"
    },
    {
      Fname:"Riya",
      Lname:"Jain",
      phone:1234567890,
      dob:"13-01-2001",
      relation:"Mother"
    },
    {
      Fname:"Sophia",
      Lname:"Neph",
      phone:1234567890,
      dob:"13-01-2001",
      relation:"Sister"
    }

  ]



  creative =[

  ]


  addPhoto=(name:string,file:any)=>{
    console.log("inside")
    console.log(file);
    this.creative.push({"name":name,file:file});
  }


}
