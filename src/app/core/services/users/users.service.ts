import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../../models/users';

type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};
interface IUser {
  email: string;
  password: string;
}
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiURL = environment.API_URL + 'users';

  constructor(private http: HttpClient) {}

  // Login
  login(value: IUser): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/login`, {
      email: value.email,
      password: value.password,
    });
  }
  // Register
  register(value: Partial<IUsers>): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiURL}/save`, {
      value,
    });
  }
}
