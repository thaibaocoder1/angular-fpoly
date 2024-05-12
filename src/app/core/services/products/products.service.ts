import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITodos } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = environment.API_URL + 'todos';

  constructor(private http: HttpClient) {}

  // [GET]
  getAll(): Observable<ITodos[]> {
    return this.http.get<ITodos[]>(this.apiURL);
  }
}
