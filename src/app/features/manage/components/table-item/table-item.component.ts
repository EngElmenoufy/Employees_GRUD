import { EmployeesManagementService } from './../../services/employees-management.service';
import {
  Component,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { Employee } from '../../../../core/models/employee.interface';
import { Item } from '../../../../core/models/item.interface';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-item',
  imports: [IconComponent, ReactiveFormsModule],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent implements OnInit {
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  isHeader = input<boolean>(false);
  items = input<Item[]>();
  employee = input<Employee>();
  hasGlobalChecked = input<boolean>();
  allChecked = model<boolean>();
  employeeItems = signal<Item[] | undefined>(undefined);
  isChecked = signal<boolean>(false);
  checkControl!: FormControl;
  sortedBy = this.employeesManagementService.sortBy;
  sortedType = this.employeesManagementService.sortType;

  constructor() {
    effect(() => {
      if (
        this.hasGlobalChecked() !== undefined &&
        this.checkControl !== undefined
      ) {
        this.checkControl.setValue(this.hasGlobalChecked()!);
      }
    });

    effect(() => {
      const hasSameValue = this.checkControl.value === this.allChecked();
      if (!hasSameValue && this.allChecked() !== undefined) {
        this.checkControl.setValue(this.allChecked()!);
      }
    });
  }

  ngOnInit(): void {
    if (this.items() === undefined) {
      this.generateItems();
    }

    this.checkControl = new FormControl(false);
    this.initSubscribe();
  }

  private initSubscribe(): void {
    this.checkControl.valueChanges.subscribe((value) => {
      if (this.isHeader()) {
        this.allChecked.set(value);
      } else {
        if (value === true && this.employee() !== undefined) {
          this.employeesManagementService.setSelectedEmployee(
            this.employee()!.empId,
          );
        } else if (value === false && this.employee() !== undefined) {
          this.employeesManagementService.removeSelectedEmployee(
            this.employee()!.empId,
          );
        }
        this.isChecked.set(value);
      }
    });
  }

  private generateItems(): void {
    if (this.employee() === undefined) return;

    this.employeeItems.set([
      {
        isCheckbox: true,
      },
      {
        isActions: true,
      },
    ]);
    const employeeValues = Object.entries(this.employee()!);
    const items = employeeValues
      .filter(([key]) => key !== 'empId')
      .map(([key, value]) => {
        const item = {
          name: value,
        };

        return item;
      });

    this.employeeItems.update((prev) => {
      const updated = prev?.splice(1, 0, ...items);
      return prev;
    });
  }

  onSort(sortBy: string | undefined): void {
    if (sortBy !== 'name' && sortBy !== 'address') return;

    this.employeesManagementService.setSort(sortBy as 'name' | 'address');
  }

  onEdit(): void {
    if (this.employee() === undefined) return;

    this.employeesManagementService.setSelectedEmployeeForEdit(
      this.employee()!,
    );
    this.employeesManagementService.isOpenEdit.set(true);
  }

  onDelete(): void {
    if (this.employee() === undefined) return;

    this.employeesManagementService.setSelectedEmployeeIdForDelete(
      this.employee()!.empId,
    );
    this.employeesManagementService.isOpenDelete.set(true);
  }
}
