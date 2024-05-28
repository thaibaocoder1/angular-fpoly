import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponseOrderDetails } from '../../adapter/details';
import { IOrderDetails } from '../../models/detail';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private apiURL = environment.API_URL + 'details';

  constructor(private http: HttpClient) {}

  addOrderDetail(values: Partial<IOrderDetails>): Observable<IOrderDetails> {
    return this.http
      .post<ApiResponseOrderDetails>(this.apiURL + '/save', {
        values,
      })
      .pipe(
        map((res: ApiResponseOrderDetails) => {
          if (res && res.success) {
            const { data } = res;
            return data;
          } else {
            throw new Error('Can not get data from CALL API!');
          }
        })
      );
  }
}
