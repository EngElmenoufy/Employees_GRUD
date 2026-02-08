import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeesManagementService } from '../manage/services/employees-management.service';
import { Employee } from '../../core/models/employee.interface';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  imports: [
    ModalComponent,
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly employeeService = inject(EmployeeService);
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  employee = input<Employee | null>();
  isOpen = model<boolean>();

  isLoading = signal<boolean>(false);
  editEmployeeForm!: FormGroup;

  get nameControl(): FormControl {
    return this.editEmployeeForm.get('empName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.editEmployeeForm.get('empEmail') as FormControl;
  }
  get addressControl(): FormControl {
    return this.editEmployeeForm.get('empAddress') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.editEmployeeForm.get('empPhone') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editEmployeeForm = this.fb.group({
      empId: [this.employee()?.empId ?? null, Validators.required],
      empName: [this.employee()?.empName ?? null, Validators.required],
      empEmail: [
        this.employee()?.empEmail ?? null,
        [Validators.required, Validators.email],
      ],
      empAddress: [this.employee()?.empAddress ?? null, [Validators.required]],
      empPhone: [
        this.employee()?.empPhone ?? null,
        [Validators.required, Validators.pattern(/^01[012][0-9]{8}$/)],
      ],
    });
  }

  onEdit(): void {
    this.editEmployeeForm.markAllAsTouched();
    if (this.editEmployeeForm.invalid) return;

    this.isLoading.set(true);
    this.employeeService.editEmployee(this.editEmployeeForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading.set(false);
        this.employeesManagementService.isOpenEdit.set(false);
        this.employeeService.getAllEmployees();
        this.toastr.success('You edited the employee successfully.');
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
