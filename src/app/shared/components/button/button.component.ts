import { Component, input } from '@angular/core';

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
}
