import { Component, input, OnInit, signal } from '@angular/core';
import { Employee } from '../../../../core/models/employee.interface';
import { Item } from '../../../../core/models/item.interface';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-table-item',
  imports: [IconComponent],
  templateUrl: './table-item.component.html',
  styleUrl: './table-item.component.css',
})
export class TableItemComponent implements OnInit {
  isHeader = input<boolean>(false);
  items = input<Item[]>();
  employee = input<Employee>();
  employeeItems = signal<Item[] | undefined>(undefined);

  ngOnInit(): void {
    if (this.items() === undefined) {
      this.generateItems();
    }
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
}
