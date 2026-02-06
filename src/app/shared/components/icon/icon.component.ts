import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
})
export class IconComponent {
  icon = input<string>();
  size = input<string>();
  color = input<string>('#000');

  sizePx = computed(() => this.size() + 'px');
}
