import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTable } from 'src/models/data-table';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @Input() dataTable!: DataTable;
  @Input() partentTableIndex?: number = undefined;
  @Input() isLoadingTable: boolean = false;
  @Output() valuesOutput: EventEmitter<any> = new EventEmitter();

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

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  setIndex(element: any, index: number) {
    element.index = index + 1;
    return element.index;
  }

  getIndex(element: any, index: number) {
    let previousValue = this.dataTable.values[index - 1];
    if (previousValue && previousValue.values) {
      element.displayIndex = index;
    } else {
      element.displayIndex = index + 1;
    }
    return element.displayIndex;
  }

  updateTable($event: any) {
    $event.id = this.dataTable.id;
    $event.userid = this.dataTable.userid;
    $event.title = this.dataTable.title;

    if (this.partentTableIndex) {
      $event.partentTableIndex = this.partentTableIndex;
    }

    this.valuesOutput.emit($event);
  }

  addValue(value: string) {
    let event = {} as any;
    event.id = this.dataTable.id;
    event.userid = this.dataTable.userid;
    event.title = this.dataTable.title;
    event.add = true;
    event.value = value;
    event.value = this.valuesOutput.emit(event);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        value: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addValue(result.value);
    });
  }
}
