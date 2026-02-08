import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeePayload } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'https://task.soft-zone.net/api/Employees/';

  employees = signal<Employee[] | undefined>(undefined);
  totalItems = signal<number>(1);
  isLoading = signal<boolean>(false);

  getAllEmployees(): void {
    this.isLoading.set(true);

    this.http.get<Employee[]>(this.URL + 'getAllEmployees').subscribe({
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

  addEmployee(body: EmployeePayload): Observable<any> {
    return this.http.post(this.URL + 'addEmployee', body);
  }

  editEmployee(body: EmployeePayload): Observable<any> {
    return this.http.post(this.URL + 'editEmployee', body);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.get(this.URL + `deleteEmpByID/${employeeId}`);
  }
}
