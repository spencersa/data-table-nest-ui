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

  constructor(private dataTableNestApi: DataTableNestApi) {}

  ngOnInit() {
    this.getTables();
  }

  async getTables() {
    this.tables = await lastValueFrom(this.dataTableNestApi.getTables());
  }

  async postTable() {
    this.tables = await lastValueFrom(this.dataTableNestApi.postTable());
    this.tables = await lastValueFrom(this.dataTableNestApi.getTables());
  }
}
