import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/adapter/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.API_URL + 'users';
  constructor(private http: HttpClient) {}

  // Check unique email
  checkUniqueEmail(value: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/check-unique`, {
      email: value,
    });
  }
  // Check email recover
  checkEmailRecover(value: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/check-recover  `, {
      email: value,
    });
  }
  // Check exist email
  checkExistEmail(value: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/check-exist`, {
      email: value,
    });
  }
}
