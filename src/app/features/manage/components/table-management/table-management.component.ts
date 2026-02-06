import { Component, inject, OnInit, signal } from '@angular/core';
import { Item } from '../../../../core/models/item.interface';
import { TableItemComponent } from '../table-item/table-item.component';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../core/models/employee.interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-table-management',
  imports: [TableItemComponent, NgxPaginationModule],
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.css',
})
export class TableManagementComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  headerItems!: Item[];
  employees = signal<Employee[] | undefined>(undefined);
  currentPage = signal<number>(1);
  totalItems = signal<number>(1);
  startIndex = signal<number>(0);
  endIndex = signal<number>(5);

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
      },
      {
        name: 'Email',
      },
      {
        name: 'Address',
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
    this.employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees.set(res);
        this.totalItems.set(res.length);
      },
    });
  }

  onPageChanged(page: number): void {
    this.startIndex.set(5 * (page - 1));
    this.endIndex.set(5 * page);
    this.currentPage.set(page);
  }
}
