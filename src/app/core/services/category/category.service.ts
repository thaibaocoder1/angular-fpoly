import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICategory } from '../../models/category';

interface IApiResponse {
  status: string;
  results: number;
  data: ICategory[];
}
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiURL = environment.API_URL + 'catalogs';

  constructor(private http: HttpClient) {}

  // [GET]
  getAll(): Observable<ICategory[]> {
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
}
