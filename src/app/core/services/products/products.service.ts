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
interface IApiResponseV2 {
  success: boolean;
  results: number;
  data: IProducts;
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
  // [POST]
  addProduct(values: IProducts): Observable<IProducts> {
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === 'thumb' && typeof values[key] === 'object') {
          const file = values[key] as File;
          formData.append(key, file);
        } else if (key === 'name' && typeof values[key] === 'string') {
          formData.append(key, String(values[key]));
        } else {
          const productKey = key as keyof IProducts;
          formData.append(key, String(values[productKey]));
        }
      }
    }
    return this.http.post<IApiResponseV2>(`${this.apiURL}/save`, formData).pipe(
      map((response: IApiResponseV2) => {
        if (response && response.success) {
          const data = response.data;
          return data;
        } else {
          throw new Error('API response is not successful.');
        }
      })
    );
  }
  // [PATCH]
  updateProduct(values: IProducts): Observable<IProducts> {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'thumb' && typeof values[key] === 'object') {
        const file = values[key] as File;
        if (file.hasOwnProperty('fileName')) {
          continue;
        } else {
          formData.append(key, file);
        }
      } else if (key === 'name' && typeof values[key] === 'string') {
        formData.append(key, String(values[key]));
      } else {
        const productKey = key as keyof IProducts;
        formData.append(key, String(values[productKey]));
      }
    }
    return this.http
      .patch<IApiResponseV2>(`${this.apiURL}/update/${values._id}`, formData)
      .pipe(
        map((response: IApiResponseV2) => {
          if (response && response.success) {
            const data = response.data;
            return data;
          } else {
            throw new Error('API response is not successful.');
          }
        })
      );
  }
}
