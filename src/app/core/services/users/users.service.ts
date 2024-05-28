import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
  // Post
  addUser(values: IUsers): Observable<IUsers> {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'imageUrl' && typeof values[key] === 'object') {
        const file = values[key] as File;
        formData.append(key, file);
      } else {
        const keyRest = key as keyof IUsers;
        formData.append(key, String(values[keyRest]));
      }
    }
    return this.http.post<ApiResponse>(`${this.apiURL}/create`, formData).pipe(
      map((res: ApiResponse) => {
        if (res && res.success) {
          const data = res.data as IUsers;
          return data;
        } else {
          throw new Error('API response is not successful.');
        }
      })
    );
  }
  // Patch
  updateUser(values: IUsers): Observable<IUsers> {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'imageUrl' && typeof values[key] === 'object') {
        const file = values[key] as File;
        if (file.hasOwnProperty('fileName')) {
          continue;
        } else {
          formData.append(key, file);
        }
      } else {
        const keyRest = key as keyof IUsers;
        formData.append(key, String(values[keyRest]));
      }
    }
    return this.http
      .patch<ApiResponse>(`${this.apiURL}/update/${values._id}`, formData)
      .pipe(
        map((res: ApiResponse) => {
          if (res && res.success) {
            const data = res.data as IUsers;
            return data;
          } else {
            throw new Error('API response is not successful.');
          }
        })
      );
  }
}
