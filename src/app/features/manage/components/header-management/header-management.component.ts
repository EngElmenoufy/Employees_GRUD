import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { EmployeesManagementService } from '../../services/employees-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-management',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './header-management.component.html',
  styleUrl: './header-management.component.css',
})
export class HeaderManagementComponent {
  private readonly toastr = inject(ToastrService);
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  isOpenAdd = this.employeesManagementService.isOpenAdd;

  onOpenAdd(): void {
    this.isOpenAdd.set(true);
  }

  onGlobalDelete(): void {
    const selected = this.employeesManagementService.selectedEmployees();
    if (!selected) {
      this.toastr.info('You should select a record first.');
      return;
    }

    this.employeesManagementService.isGlobalDelete.set(true);
    this.employeesManagementService.isOpenDelete.set(true);
  }
}
