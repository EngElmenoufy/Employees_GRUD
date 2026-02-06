import { Component } from '@angular/core';
import { ManageComponent } from './features/manage/manage.component';

@Component({
  selector: 'app-root',
  imports: [ManageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
