import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.css']
})
export class CreativeComponent implements OnInit {

  familyDetails = [];
  creative = [];

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.familyDetails = this.formDataService.data.familyDetails;
    this.creative = this.formDataService.getCreativePictures(); 
    console.log('Creative Pictures:', this.creative);
  }

  addPhoto(name: string, event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log("Uploading file:", file);
      this.formDataService.addCreativePicture(name, file);
      this.creative = this.formDataService.getCreativePictures(); // Refresh creative array from service
    }
  }

  getUploadedFile(name: string) {
    console.log(this.creative)
    const data = this.creative.find(c => c.firstName === name)?.image || null;
    console.log(data);
    return data;
  }

  removePhoto(name: string) {
    this.formDataService.removeCreativePicture(name);
    this.creative = this.formDataService.getCreativePictures(); // Refresh creative array from service
  }
}
