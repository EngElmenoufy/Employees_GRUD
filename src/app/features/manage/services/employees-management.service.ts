import { Injectable, signal } from '@angular/core';
import { Employee } from '../../../core/models/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeesManagementService {
  private selectedEmployeesSignal = signal<number[] | null>(null);
  private selectedEmployeeIdForDeleteSignal = signal<number | null>(null);
  private selectedEmployeeForEditSignal = signal<Employee | null>(null);
  private sortBySignal = signal<'name' | 'address' | null>(null);
  private sortTypeSignal = signal<'asc' | 'desc' | null>(null);

  selectedEmployees = this.selectedEmployeesSignal.asReadonly();
  selectedEmployeeIdForDelete =
    this.selectedEmployeeIdForDeleteSignal.asReadonly();
  selectedEmployeeForEdit = this.selectedEmployeeForEditSignal.asReadonly();
  sortBy = this.sortBySignal.asReadonly();
  sortType = this.sortTypeSignal.asReadonly();
  isGlobalDelete = signal<boolean>(false);
  isOpenAdd = signal<boolean>(false);
  isOpenEdit = signal<boolean>(false);
  isOpenDelete = signal<boolean>(false);

  setSelectedEmployee(id: number): void {
    const isSelected = this.selectedEmployeesSignal()?.find(
      (selectedId) => selectedId === id,
    );

    if (isSelected === undefined) {
      this.selectedEmployeesSignal.update((prev) => [...(prev ?? []), id]);
    }
  }

  setSelectedEmployeeIdForDelete(employeeId: number | null): void {
    this.selectedEmployeeIdForDeleteSignal.set(employeeId);
  }

  setSelectedEmployeeForEdit(employee: Employee | null): void {
    this.selectedEmployeeForEditSignal.set(employee);
  }

  setSort(by: 'name' | 'address'): void {
    if (this.sortBySignal() === by) {
      if (this.sortType() === null) {
        this.sortTypeSignal.set('asc');
      } else if (this.sortType() === 'asc') {
        this.sortTypeSignal.set('desc');
      } else if (this.sortType() === 'desc') {
        this.sortTypeSignal.set('asc');
      }
    } else {
      this.sortTypeSignal.set('asc');
    }
    this.sortBySignal.set(by);
  }

  removeSelectedEmployee(id: number): void {
    if (this.selectedEmployeesSignal() === null) return;

    this.selectedEmployeesSignal.update((prev) =>
      prev!.filter((employeeId) => employeeId !== id),
    );
  }

  resetSelectedEmployees(): void {
    this.selectedEmployeesSignal.set(null);
  }
}
