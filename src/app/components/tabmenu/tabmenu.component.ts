import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { StockComponent } from '../stock/stock.component';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrl: './tabmenu.component.css',
  standalone: true,
  imports: [TabViewModule, StockComponent],
})
export class TabmenuComponent {}
