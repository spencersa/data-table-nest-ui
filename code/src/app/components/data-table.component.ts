import { Component, Input, OnInit } from '@angular/core';
import { DataTable } from 'src/models/data-table';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @Input() values: DataTable[] = [];

  columns = [
    {
      columnDef: 'number',
      header: 'No.',
      cell: (value: any) => `${value}`,
    },
    {
      columnDef: 'values',
      header: 'Values',
      cell: (value: any) => `${value.value}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor() {}
  ngOnInit(): void {}

  setIndex(element: any, index: number) {
    element.index = index + 1;
    return element.index;
  }

  getIndex(element: any, index: number) {
    let previousValue = this.values[index - 1];
    if (previousValue && previousValue.values) {
      element.displayIndex = index;
    } else {
      element.displayIndex = index + 1;
    }
    return element.displayIndex;
  }
}
