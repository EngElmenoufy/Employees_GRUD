import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeesManagementService {
  private selectedEmployeesSignal = signal<number[] | null>(null);
  private sortBySignal = signal<'name' | 'address' | null>(null);
  private sortTypeSignal = signal<'asc' | 'desc' | null>(null);

  selectedEmployees = this.selectedEmployeesSignal.asReadonly();
  sortBy = this.sortBySignal.asReadonly();
  sortType = this.sortTypeSignal.asReadonly();

  setSelectedEmployee(id: number): void {
    const isSelected = this.selectedEmployeesSignal()?.find(
      (selectedId) => selectedId === id,
    );

    if (isSelected === undefined) {
      this.selectedEmployeesSignal.update((prev) => [...(prev ?? []), id]);
    }
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
