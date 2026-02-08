import { Component, input, model, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [IconComponent, ButtonComponent, TitleCasePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  header = input<string>();
  btnMainClasses = input<string>();
  btnMainText = input<string>();
  isOpen = model<boolean>();
  pressMain = output<void>();

  onClose(): void {
    this.isOpen.set(false);
  }

  onPressMain(): void {
    this.pressMain.emit();
  }
}
