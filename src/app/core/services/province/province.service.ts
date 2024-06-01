import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Province {
  province_id: string;
  province_name: string;
  province_type: string;
}
interface ApiRes {
  results: Province[];
}

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  url: string = '/assets/province.json';
  private baseUrl = 'https://vapi.vnappmob.com/api/province';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  constructor(private http: HttpClient) {}

  getAllProvinces(): Observable<Province[]> {
    return this.http.get<ApiRes>(this.url).pipe(
      map((res: ApiRes) => {
        if (res && res.results) {
          const { results } = res;
          return results;
        } else {
          throw new Error('Can not get data');
        }
      })
    );
  }
}
