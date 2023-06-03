import { Component, OnInit } from '@angular/core';
import { DataTableNestApi } from 'src/services/data-table-nest-api.component';
import { lastValueFrom } from 'rxjs';
import { DataTable } from 'src/models/data-table';

@Component({
  selector: 'data-tables',
  templateUrl: './data-tables.component.html',
  providers: [DataTableNestApi],
})
export class DataTablesComponent implements OnInit {
  public tables: DataTable[] = [];
  public isLoadingTables: boolean = true;

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
}
