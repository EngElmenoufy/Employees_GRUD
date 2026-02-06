import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-header-management',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './header-management.component.html',
  styleUrl: './header-management.component.css',
})
export class HeaderManagementComponent {}
