import { Component } from '@angular/core';
import { CommonComponent } from '../common/common.component';

@Component({ 
  selector: 'app-family-details',
  standalone: true,
  imports: [CommonComponent],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.css'
})
export class FamilyDetailsComponent {

}
