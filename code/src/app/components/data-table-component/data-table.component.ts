import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTable } from 'src/models/data-table';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DataTableNestApi } from 'src/services/data-table-nest-api.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  @Input() dataTable!: DataTable;
  @Input() parentTable: DataTable | undefined;
  @Input() parentTableIndex?: number = undefined;
  @Input() isLoadingTable: boolean = false;
  @Input() isSubTable?: boolean = false;
  @Output() reloadOutput: EventEmitter<any> = new EventEmitter();

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

  constructor(
    private dataTableNestApi: DataTableNestApi,
    public dialog: MatDialog
  ) {}
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

  async updateTable($event: any) {
    if ($event.delete) {
      this.removeValue($event);
    } else if ($event.add) {
      this.dataTable.values.push({ value: $event.value });
    } else if ($event.makeSubValue) {
      this.makeSubValue($event);
    } else if ($event.makePrimaryValue) {
      this.makePrimaryValue($event);
    } else {
      this.updateValue($event);
    }

    this.isLoadingTable = true;
    if (this.parentTable) {
      await lastValueFrom(this.dataTableNestApi.putTable(this.parentTable));
      this.parentTable;
    } else {
      await lastValueFrom(this.dataTableNestApi.putTable(this.dataTable));
    }
    this.isLoadingTable = false;

    if (this.parentTable) {
      this.parentTable.values = [...this.parentTable.values];
    }
    this.dataTable.values = [...this.dataTable.values];
  }

  addValue(value: string) {
    let event = {} as any;
    event.add = true;
    event.value = value;
    this.updateTable(event);
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

  updateValue($event: any) {
    if (this.parentTableIndex && this.parentTable) {
      this.parentTable.values[this.parentTableIndex].values[
        $event.index
      ].value = $event.value;
    } else {
      this.dataTable.values[$event.index].value = $event.value;
    }
  }

  removeValue($event: any) {
    if (this.parentTableIndex) {
      this.dataTable.values[this.parentTableIndex].values.splice(
        $event.index,
        1
      );
      if (this.dataTable.values[this.parentTableIndex].values.length === 0) {
        this.dataTable.values.splice(this.parentTableIndex, 1);
      }
    } else {
      this.dataTable.values.splice($event.index, 1);
    }
  }

  makeSubValue($event: any) {
    if (this.dataTable.values[$event.index - 1].values) {
      this.dataTable.values[$event.index - 1].values.push({
        value: this.dataTable.values[$event.index].value,
      });
      this.dataTable.values.splice($event.index, 1);
    } else {
      this.dataTable.values[$event.index].values = [
        {
          value: this.dataTable.values[$event.index].value,
        },
      ];
      delete this.dataTable.values[$event.index].value;
    }
  }

  makePrimaryValue($event: any) {
    this.parentTable!.values.splice(this.parentTableIndex!, 0, {
      value: this.dataTable.values[$event.index].value,
    });
    this.dataTable.values.splice($event.index, 1);

    if (this.dataTable.values.length === 0) {
      this.parentTable!.values.splice(this.parentTableIndex! + 1, 1);
    }
  }
}
