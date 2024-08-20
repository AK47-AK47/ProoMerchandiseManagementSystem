import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { Product } from "../../models/product";

@Component({
    selector: 'app-stock',
    standalone: true,
    imports: [TableModule],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.css',
})
export class StockComponent implements OnInit {
    @ViewChild('dt') dt!: Table;

    isSorted: boolean | null | undefined = null;
    
    initialValue: Product[] = [];

    products: Product[] = [];

    ngOnInit() {
      //service or store-effect-service call
        /*this.products = {
            {name: "t-shirt",
            sizes: ["S","M","L","XL","XXL"],
            colors:["White","Black","Purple","Red"],
            price: 10,
            quantity: 100},
        };*/
        this.initialValue = [];

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
            this.products = [...this.initialValue];
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
