import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'https://task.soft-zone.net/api/Employees/';

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URL + 'getAllEmployees');
  }
}
