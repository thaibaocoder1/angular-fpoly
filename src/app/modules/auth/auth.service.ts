import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

interface ApiResponse {
  success: boolean;
  message: string;
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
}
