import { Component, inject, model, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { InputComponent } from '../../shared/components/input/input.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { EmployeesManagementService } from '../manage/services/employees-management.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly employeeService = inject(EmployeeService);
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  isOpen = model<boolean>();

  isLoading = signal<boolean>(false);
  addEmployeeForm!: FormGroup;

  get nameControl(): FormControl {
    return this.addEmployeeForm.get('empName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.addEmployeeForm.get('empEmail') as FormControl;
  }
  get addressControl(): FormControl {
    return this.addEmployeeForm.get('empAddress') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.addEmployeeForm.get('empPhone') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addEmployeeForm = this.fb.group({
      empName: [null, Validators.required],
      empEmail: [null, [Validators.required, Validators.email]],
      empAddress: [null, [Validators.required]],
      empPhone: [
        null,
        [Validators.required, Validators.pattern(/^01[012][0-9]{8}$/)],
      ],
    });
  }

  onAdd(): void {
    this.addEmployeeForm.markAllAsTouched();
    if (this.addEmployeeForm.invalid) return;

    this.isLoading.set(true);
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.employeesManagementService.isOpenAdd.set(false);
        this.employeeService.getAllEmployees();
        this.toastr.success('You added a new employee successfully.');
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
