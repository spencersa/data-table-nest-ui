import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTable } from 'src/models/data-table';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class DataTableNestApi {
  apiUrl: string = 'https://ba4il414di.execute-api.us-east-2.amazonaws.com/';

  constructor(private http: HttpClient) {}

  getTables(): Observable<Array<DataTable>> {
    return this.http.get<any[]>(`${this.apiUrl}/tables`, {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token') || '',
      }),
      responseType: 'json',
    });
  }

  postTable(): Observable<Array<DataTable>> {
    console.log(localStorage.getItem('token') || '');
    return this.http.post<any[]>(
      `${this.apiUrl}/tables`,
      {},
      {
        headers: new HttpHeaders({
          authorization: localStorage.getItem('token') || '',
        }),
        responseType: 'json',
      }
    );
  }
}
