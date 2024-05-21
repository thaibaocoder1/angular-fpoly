import { Injectable, signal } from '@angular/core';
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
  userSignals = signal<ApiResponse | undefined | null>(undefined);

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
  // Refresh token
  refresh(): Observable<void> {
    return this.http.get<void>(`${environment.API_URL}refresh`);
  }
  // Logout
  logout(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}/logout/${userId}`);
  }
  // Get one
  getUser(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}/${userId}`);
  }
  // Get all
  getAllUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiURL}`);
  }
}
