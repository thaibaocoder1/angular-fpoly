import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUsers } from '../../core/models/users';

type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
interface IUser {
  email: string;
  password: string;
}
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
  // Check exist email
  checkExistEmail(value: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/check-exist`, {
      email: value,
    });
  }
}
