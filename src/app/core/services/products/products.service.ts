import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProducts } from '../../models/products';
import { map } from 'rxjs/operators';

interface IApiResponse {
  status: string;
  success?: boolean;
  results: number;
  data: IProducts[];
}
interface ApiResCheck {
  success: boolean;
  message: string;
  data: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = environment.API_URL + 'products';

  constructor(private http: HttpClient) {}

  // [GET]
  getAll(): Observable<IProducts[]> {
    return this.http.get<IApiResponse>(this.apiURL).pipe(
      map((response: IApiResponse) => {
        if (response && response.status === 'success') {
          const data = response.data;
          return data;
        } else {
          throw new Error('API response is not successful.');
        }
      })
    );
  }
  // [GET] With Type
  getWithSlug(slug: string): Observable<IProducts[]> {
    return this.http.get<IApiResponse>(`${this.apiURL}/list/${slug}`).pipe(
      map((response: IApiResponse) => {
        if (response && response.success === true) {
          const data = response.data;
          return data;
        } else {
          const data = response.data;
          return data;
        }
      })
    );
  }
  // [CHECK] Code
  checkCode(value: string): Observable<ApiResCheck> {
    return this.http.post<ApiResCheck>(`${this.apiURL}/check`, {
      value: value,
    });
  }
}
