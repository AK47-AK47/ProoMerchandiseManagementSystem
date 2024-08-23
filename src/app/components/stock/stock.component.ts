import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { Product } from "../../models/product";
import { MerchApiCallsService } from '../../services/api-calls/merch-api-calls.service';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  isSorted: boolean | null | undefined = null;

  initialValue: Product[] = [];
  products$: Observable<any> = of([]); // Initialize as an empty Observable

  constructor(private merchServices: MerchApiCallsService) {}

  ngOnInit() {
    this.products$ = this.merchServices.getAllMerchStock().pipe(
      map((res) => res.body || []), // Access body(aka products array) safely and return an empty array if null
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array as a default value if error occurs
      })
    );
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.products$ = of([...this.initialValue]);
      this.dt.reset();
    }
  }

  sortTableData(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field!];
      let value2 = data2[event.field!];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order! * result;
    });
  }
}
