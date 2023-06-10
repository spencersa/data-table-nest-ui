import { Component, OnInit } from '@angular/core';
import { DataTableNestApi } from 'src/services/data-table-nest-api.component';
import { lastValueFrom } from 'rxjs';
import { DataTable } from 'src/models/data-table';

@Component({
  selector: 'data-tables',
  templateUrl: './data-tables.component.html',
  providers: [DataTableNestApi],
  styleUrls: ['data-tables.component.css'],
})
export class DataTablesComponent implements OnInit {
  public tables: DataTable[] = [];
  public isLoadingTables: boolean = true;

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

  constructor(private dataTableNestApi: DataTableNestApi) {}

  ngOnInit() {
    this.getTables();
  }

  async getTables() {
    this.isLoadingTables = true;
    this.tables = await lastValueFrom(this.dataTableNestApi.getTables());
    this.isLoadingTables = false;
  }

  async postTable() {
    await lastValueFrom(this.dataTableNestApi.postTable());
    await this.getTables();
  }

  async updateTable($event: any) {
    let table = this.tables.filter((table) => table.id === $event.id)[0];
    if ($event.partentTableIndex) {
      table.values[$event.partentTableIndex].values[$event.index].value =
        $event.value;
    } else {
      table.values[$event.index].value = $event.value;
    }
    await lastValueFrom(this.dataTableNestApi.putTable(table));
  }
}
