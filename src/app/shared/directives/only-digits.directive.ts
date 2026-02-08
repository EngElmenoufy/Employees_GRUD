import { Directive, HostListener, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyDigits]',
  standalone: true,
})
export class OnlyDigitsDirective {
  private ngControl = inject(NgControl);

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End',
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '');

    // Keep model & view clean
    this.ngControl.control?.setValue(digitsOnly, { emitEvent: false });
    input.value = digitsOnly;
  }
}
