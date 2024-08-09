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
      dob:""
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
}
