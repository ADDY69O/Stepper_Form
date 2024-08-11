import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ApiPostService } from '../services/api-calling.service';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from '../form-data.service';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  constructor(private ApiService:ApiPostService,private toastr: ToastrService,private formService: FormDataService){}

  inputSearch:string;
  autoComplete : any[] = [];

  country:string;
  state:string;
  city:string;

  ngOnInit (){
    let data = this.formService.data.address;
    this.country = data.country;
    this.state = data.state;
    this.city = data.city;
  }

  handleInputChange (){
    console.log(this.inputSearch);
   this.ApiService.getPlaces(this.inputSearch).subscribe(data =>
    this.autoComplete = data.predictions
   )
   // this.inputSearch=value;
  }
  selectAddress(address: any) {
    this.inputSearch = address.description;
    this.autoComplete = [];

    let newArray = [];
    newArray = this.inputSearch.split(",");
  

    if(newArray.length < 2){
      this.toastr.error('Only Country is Selected','Error');
    }
    else  if(newArray.length < 3){
      this.toastr.error('Only Country & state is Selected','Error');
    }
    else{
      this.toastr.success('Successfully selected ','Success');
      this.country = newArray[newArray.length-1];
      this.state = newArray[newArray.length-2];
      let cityArray = newArray.slice(0, newArray.length-2);
      this.city = cityArray.join();
      this.formService.addAddress(this.country,this.city,this.state)




    }

  }

 
}

//(change)="handleInputChange($event.target.value)"

// [input]="$event.target.value"