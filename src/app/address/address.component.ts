import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ApiPostService } from '../services/api-calling.service';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @ViewChild('address') Form: NgForm;
  constructor(
    private ApiService: ApiPostService,
    private toastr: ToastrService,
    private formService: FormDataService
  ) {}

  isValidated = false;
  inputSearch = '';
  autoComplete: any[] = [];

  country = '';
  state = '';
  city = '';

  ngOnInit() {
    let data = this.formService.data.address;
    this.country = data.country;
    this.state = data.state;
    this.city = data.city;
  }

  validateAddress() {
    // Perform validation for required fields
    if(!this.isValidated){
      Object.keys(this.Form.controls).forEach(field => {
        const control = this.Form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
    return this.isValidated;



  }

  handleInputChange() {
    console.log(this.inputSearch);
    this.ApiService.getPlaces(this.inputSearch).subscribe(data => this.autoComplete = data.predictions);
  }

  selectAddress(address: any) {
    this.inputSearch = address.description;
    this.autoComplete = [];

    let newArray = [];
    newArray = this.inputSearch.split(",");

    if (newArray.length < 2) {
      this.toastr.error('Only Country is Selected', 'Error');
    } else if (newArray.length < 3) {
      this.toastr.error('Only Country & state is Selected', 'Error');
    } else {
      this.toastr.success('Successfully selected', 'Success');
      this.country = newArray[newArray.length - 1];
      this.state = newArray[newArray.length - 2];
      let cityArray = newArray.slice(0, newArray.length - 2);
      this.city = cityArray.join();
      this.formService.addAddress(this.country, this.city, this.state);
      this.isValidated = true;
    }
  }
}
