import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../models/pagination';
import { TableDataParams } from '../models/tableDataParams';
import { TrainingDto } from '../models/training-dto';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  transApiUrl: string = environment.transApiUrl;
  embedApiUrl: string = environment.embedApiUrl;
  backOfficeApiUrl: string = environment.backOfficeApiUrl;

  paginatedResult: PaginatedResult<TrainingDto[]> = new PaginatedResult<TrainingDto[]>();

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
      .get<TrainingDto[]>(this.backOfficeApiUrl + '/api/MessageTransactions/TrainingMessages', {
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

  updateCompletion(trainingData: any, id: number) {
    return this.http.put<TrainingDto>(
      this.backOfficeApiUrl + '/api/messagetransactions/' + id, trainingData);
  }
  // getMessage(id: number): Observable<MessageTransaction>{
  //   return this.http.get<MessageTransaction>(this.baseApiUrl + '/api/messagetransactions/'+ id);
  // }

}