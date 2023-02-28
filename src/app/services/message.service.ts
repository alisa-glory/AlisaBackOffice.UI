import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageTransaction } from '../models/messages-transaction';
import { PaginatedResult } from '../models/pagination';
import { TableDataParams } from '../models/tableDataParams';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseApiUrl: string = environment.apiUrl;
  paginatedResult: PaginatedResult<MessageTransaction[]> = new PaginatedResult<MessageTransaction[]>();

  constructor(private http: HttpClient) {}

  getMessages(p: TableDataParams) {
    console.log('api p =>', p);
    let params = new HttpParams();

    params = params.append('pageNumber', p.page);
    params = params.append('pageSize', p.itemsPerPage);
    params = params.append('sortByField', p.sortByField);
    params = params.append('sortByOrder', p.sortByOrder);
    params = params.append('searchText', p.searchText);
    p.selectedColumns.forEach((columnName) => {
      params = params.append('selectedColumns', columnName);
    });

    console.log('HttpParams =>', params);

    return this.http
      .get<MessageTransaction[]>(this.baseApiUrl + '/api/MessageTransactions', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }
          return this.paginatedResult;
        })
      );
  }

  getMessage(id: number): Observable<MessageTransaction>{
    return this.http.get<MessageTransaction>(this.baseApiUrl + '/api/messagetransactions/'+ id);
  }


  // addCustomer(customer: any) {
  //   return this.http.post<MessageTransactions>(
  //     this.baseApiUrl + '/api/customers',
  //     customer
  //   );
  // }

  // updateCustomer(customer: any, id: string) {
  //   return this.http.put<MessageTransactions>(
  //     this.baseApiUrl + '/api/customers/' + id,
  //     customer
  //   );
  // }

  // deleteCustomer(id: string) {
  //   return this.http.delete(this.baseApiUrl + '/api/customers/' + id);
  // }
}
