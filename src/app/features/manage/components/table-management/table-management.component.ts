import { EmployeesManagementService } from './../../services/employees-management.service';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../../../core/models/item.interface';
import { TableItemComponent } from '../table-item/table-item.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableItemLoadingComponent } from '../table-item-loading/table-item-loading.component';

@Component({
  selector: 'app-table-management',
  imports: [TableItemComponent, NgxPaginationModule, TableItemLoadingComponent],
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.css',
})
export class TableManagementComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly employeesManagementService = inject(
    EmployeesManagementService,
  );

  headerItems!: Item[];
  employees = signal<Employee[] | undefined>(undefined);
  currentPage = signal<number>(1);
  totalItems = signal<number>(1);
  startIndex = signal<number>(0);
  endIndex = signal<number>(10);
  isLoading = signal<boolean>(false);
  isAllChecked = signal<boolean>(false);
  sortedBy = this.employeesManagementService.sortBy;
  sortedType = this.employeesManagementService.sortType;

  constructor() {
    effect(() => {
      this.sortEmployees(this.sortedBy(), this.sortedType());
    });
  }

  ngOnInit(): void {
    this.initHeaderItems();

    this.getAllEmployees();
  }

  private initHeaderItems(): void {
    this.headerItems = [
      {
        isCheckbox: true,
      },
      {
        name: 'Name',
        canSort: true,
      },
      {
        name: 'Email',
      },
      {
        name: 'Address',
        canSort: true,
      },
      {
        name: 'Phone',
      },
      {
        name: 'Actions',
      },
    ];
  }

  private getAllEmployees(): void {
    this.isLoading.set(true);

    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees.set(res);
        this.totalItems.set(res.length);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  onPageChanged(page: number): void {
    this.startIndex.set(10 * (page - 1));
    this.endIndex.set(10 * page);
    this.currentPage.set(page);
  }

  sortEmployees(
    sortBy: 'name' | 'address' | null,
    sortType: 'asc' | 'desc' | null,
  ) {
    if (sortBy === null || sortType === null) return;

    const fieldMap = {
      name: 'empName',
      address: 'empAddress',
    } as const;
    const key = fieldMap[sortBy];

    if (sortType === 'asc') {
      this.employees.update((prev) =>
        prev?.sort((a, b) => a[key].localeCompare(b[key])),
      );
    } else if (sortType === 'desc') {
      this.employees.update((prev) =>
        prev?.sort((a, b) => b[key].localeCompare(a[key])),
      );
    }
  }
}
