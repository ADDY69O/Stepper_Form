import { Injectable } from '@angular/core';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }


  public data = {

    common:{
      Fname:"",
      Lname:"",
      Phone:null,
      dob:null
    },

    basicDetails : {
        Email:"",
        Website:""
    },
    familyDetails:[
      {
        Fname:"",
        Lname:"",
        Phone:null,
        dob:""
      }
    ],
    creative:[
      {
        firstName:"",
        lastName:"",
        image:""
      }

    ],
    address:{
      city:"",
      state:"",
      country:"",
      pincode:null,


    }   
}

 addCommonData = (data:any)=>{
  this.data.common=data;

  console.log(this.data.common)
  console.log(typeof data.dob)
}


 addBasicData = (data:any)=>{
  this.data.basicDetails=data;

  console.log(this.data.basicDetails)
}


}
