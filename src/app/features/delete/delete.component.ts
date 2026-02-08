import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { EmployeesManagementService } from '../manage/services/employees-management.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  private readonly employeeService = inject(EmployeeService);
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  isOpen = model<boolean>();
  isLoading = signal<boolean>(false);
  selectedEmployeesId = signal<number[] | null>(null);
  isGlobalDelete = this.employeesManagementService.isGlobalDelete;

  ngOnInit(): void {
    if (this.isGlobalDelete()) {
      this.selectedEmployeesId.set(
        this.employeesManagementService.selectedEmployees(),
      );
    } else {
      const selectedId =
        this.employeesManagementService.selectedEmployeeIdForDelete();

      if (selectedId === null) return;
      this.selectedEmployeesId.set([selectedId]);
    }
  }

  onDelete(): void {
    const ids = this.selectedEmployeesId();

    if (!ids) return;

    this.isLoading.set(true);

    forkJoin(
      ids.map((id) => this.employeeService.deleteEmployee(id)),
    ).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isOpen.set(false);
        // this.employeesManagementService.resetSelectedEmployees();
        this.employeeService.getAllEmployees();
      },
      complete: () => {
        if (this.isGlobalDelete()) {
          const employeesNum =
            this.employeesManagementService.selectedEmployees()?.length;
          if (employeesNum === undefined) return;

          if (employeesNum > 1) {
            this.toastr.success('You removed records successfully.');
          } else {
            this.toastr.success('You removed a record successfully.');
          }
          this.employeesManagementService.resetSelectedEmployees();
        } else {
          this.toastr.success('You removed a record successfully.');
        }
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onClose(): void {
    this.isOpen.set(false);
  }
}
