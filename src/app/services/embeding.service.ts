import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetEmbeddedDto } from '../models/get-embed-dto';
import { PaginatedResult } from '../models/pagination';
import { TableDataParams } from '../models/tableDataParams';

@Injectable({
  providedIn: 'root'
})
export class EmbedingService {
  transApiUrl: string = environment.transApiUrl;
  embedApiUrl: string = environment.embedApiUrl;
  backOfficeApiUrl: string = environment.backOfficeApiUrl;

  paginatedResult: PaginatedResult<GetEmbeddedDto[]> = new PaginatedResult<any[]>();

  constructor(private http: HttpClient) {}

  getAllEmbeddedData(p: TableDataParams) {
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
      .get<GetEmbeddedDto[]>(this.backOfficeApiUrl + '/api/embeding', {
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


  getEmbeddedData(id: number): Observable<GetEmbeddedDto>{
    return this.http.get<GetEmbeddedDto>(this.backOfficeApiUrl + '/api/embedding/'+ id);
  }
}
