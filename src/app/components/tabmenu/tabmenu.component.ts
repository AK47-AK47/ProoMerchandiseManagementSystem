import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrl: './tabmenu.component.css',
  standalone: true,
  imports: [TabViewModule],
})
export class TabmenuComponent {}
