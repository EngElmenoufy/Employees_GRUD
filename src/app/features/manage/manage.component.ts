import {
  Component,
  effect,
  inject,
  Signal,
  WritableSignal,
} from '@angular/core';
import { AddComponent } from '../add/add.component';
import { HeaderManagementComponent } from './components/header-management/header-management.component';
import { TableManagementComponent } from './components/table-management/table-management.component';
import { EmployeesManagementService } from './services/employees-management.service';
import { EditComponent } from '../edit/edit.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-manage',
  imports: [
    HeaderManagementComponent,
    TableManagementComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent {
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  isOpenAdd = this.employeesManagementService.isOpenAdd;
  isOpenEdit = this.employeesManagementService.isOpenEdit;
  selectedEmployeeForEdit =
    this.employeesManagementService.selectedEmployeeForEdit;
  isOpenDelete = this.employeesManagementService.isOpenDelete;
  // selectedEmployeeIdForDelete =
  //   this.employeesManagementService.selectedEmployeeIdForDelete;
  // selectedEmployees = this.employeesManagementService.selectedEmployees;
  isGlobalDelete = this.employeesManagementService.isGlobalDelete;

  constructor() {
    effect(() => {
      if (!this.isOpenEdit()) {
        this.employeesManagementService.setSelectedEmployeeForEdit(null);
      }
    });
    effect(() => {
      if (!this.isOpenDelete()) {
        if (!this.isGlobalDelete()) {
          this.employeesManagementService.setSelectedEmployeeIdForDelete(null);
        }
      }
    });
  }
}
