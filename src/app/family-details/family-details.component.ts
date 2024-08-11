import { Component, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { FormsModule, NgModel } from '@angular/forms';
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
  @ViewChildren('relationInput') relationInputs: QueryList<ElementRef>;

  noOfFamilyMemebers: FamilyMember[] = [];

  constructor(private formService: FormDataService, private renderer: Renderer2) {}

  ngOnInit() {
    this.noOfFamilyMemebers = this.formService.data.familyDetails || [];
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
    console.log(this.relationInputs);
    // Ensure relation fields are marked as touched to trigger validation
    if (this.relationInputs) {
      this.relationInputs.forEach((relationInput) => {
        const element = relationInput.nativeElement;
        const relationValue = element.value;

        if (!relationValue) {
          // Mark the input as touched using Renderer2
          this.renderer.addClass(element, 'ng-touched');
          this.renderer.addClass(element, 'ng-invalid');
        }
      });
    }

    const allValid = this.checkisValid() && this.noOfFamilyMemebers.every((member) => !!member.relation);

    if (allValid) {
      this.noOfFamilyMemebers.forEach((member, index) => {
        this.formService.addFamilyData(index, member);
      });
      console.log('All family data saved:', this.formService.data.familyDetails);
      
      // Call handleCommonFamilyForm for each component
      this.commonComponents.forEach((component) => component.handleCommonFamilyForm());
    } else {
      this.commonComponents.forEach((component) => component.showError());
      console.log('Form is not valid');
    }
  }

  updateFamilyMemberData(index: number, data: Partial<FamilyMember>) {
    console.log(data);
    console.log(this.noOfFamilyMemebers);
    if (index >= 0 && index < this.noOfFamilyMemebers.length) {
      this.noOfFamilyMemebers[index] = { ...this.noOfFamilyMemebers[index], ...data };
    }
  }
}
