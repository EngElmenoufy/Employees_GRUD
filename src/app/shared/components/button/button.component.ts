import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {
    class: 'transition-colors',
  },
})
export class ButtonComponent {
  text = input<string>();
  type = input<string>('button');
  isLoading = input<boolean>(false);
  press = output<void>();

  onPress(): void {
    this.press.emit();
  }
}
