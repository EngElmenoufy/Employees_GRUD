import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-validation',
  imports: [],
  templateUrl: './error-validation.component.html',
  styleUrl: './error-validation.component.css',
})
export class ErrorValidationComponent {
  control = input.required<AbstractControl>();
  label = input<string>('input');
}
