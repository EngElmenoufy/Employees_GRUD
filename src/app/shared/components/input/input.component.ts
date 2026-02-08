import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ErrorValidationComponent } from '../error-validation/error-validation.component';
import { OnlyDigitsDirective } from '../../directives/only-digits.directive';

@Component({
  selector: 'app-input',
  imports: [ErrorValidationComponent, ReactiveFormsModule, OnlyDigitsDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  label = input<string>('');
  id = input<string>('input');
  type = input<string>('text');
  control = input.required<FormControl>();
  placeholder = input<string>('Enter your input');
}
