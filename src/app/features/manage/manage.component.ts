import { Component } from '@angular/core';
import { HeaderManagementComponent } from './components/header-management/header-management.component';
import { TableManagementComponent } from './components/table-management/table-management.component';

@Component({
  selector: 'app-manage',
  imports: [HeaderManagementComponent, TableManagementComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {}
