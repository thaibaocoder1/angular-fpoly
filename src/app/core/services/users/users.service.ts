import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../../models/users';
import { ApiResponse, IUser } from '../../adapter/users';

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
  // Get
  getUser(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}/${userId}`);
  }
}
