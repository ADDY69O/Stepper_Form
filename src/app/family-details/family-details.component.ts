import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../form-data.service';

interface FamilyMember {
  Fname: string;
  Lname: string;
  Phone: number;
  dob: string;
  relation: string;
}

@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [CommonComponent, FormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent {
  @ViewChildren(CommonComponent) commonComponents: QueryList<CommonComponent>;

  noOfFamilyMemebers: FamilyMember[] = [];

  constructor(private formService: FormDataService) {}

  ngOnInit() {
    this.noOfFamilyMemebers = this.formService.data.familyDetails;
  }

  addFamilyMember() {
    this.noOfFamilyMemebers.push({
      Fname: '',
      Lname: '',
      Phone: null,
      dob: '',
      relation: '',
    });
  }

  removeFamilyMember(index: number) {
    if (index > -1) {
      this.noOfFamilyMemebers.splice(index, 1);
    }
  }

  checkisValid(): boolean {
    if (!this.commonComponents || this.commonComponents.length === 0) {
      return true;
    }

    return this.commonComponents.toArray().every((component) => component.checkisValid());
  }

  handleFamilyForm() {
    
    this.noOfFamilyMemebers.forEach((member, index) => {
      this.formService.addFamilyData(index, member);
    });
  
    console.log('All family data saved:', this.formService.data.familyDetails);
    
    // Call handleCommonFamilyForm for each component
    this.commonComponents.forEach((component) => component.handleCommonFamilyForm());

    
  }

  updateFamilyMemberData(index: number, data: Partial<FamilyMember>) {
    console.log(data);
    console.log(this.noOfFamilyMemebers);
    if (index >= 0 && index < this.noOfFamilyMemebers.length) {
      this.noOfFamilyMemebers[index] = { ...this.noOfFamilyMemebers[index], ...data };
    }
  }
}
