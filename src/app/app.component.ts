import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonInputComponent } from './common-input/common-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormComponent,NavbarComponent, ToastrModule,CommonInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stepperForm';
}
