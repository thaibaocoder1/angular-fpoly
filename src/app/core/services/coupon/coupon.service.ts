import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { ApiResCoupon, ICoupons } from '../../models/coupon';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private apiURL = environment.API_URL + 'coupons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ICoupons[]> {
    return this.http.get<ApiResCoupon>(this.apiURL).pipe(
      map((res: ApiResCoupon) => {
        if (res && res.success) {
          const { data } = res;
          return data as ICoupons[];
        } else {
          throw new Error('Error from server when call API!');
        }
      })
    );
  }
  getOne(id: string): Observable<ICoupons> {
    return this.http.get<ApiResCoupon>(`${this.apiURL}/${id}`).pipe(
      map((res: ApiResCoupon) => {
        if (res && res.success) {
          const { data } = res;
          return data as ICoupons;
        } else {
          throw new Error('Error from server when call API!');
        }
      })
    );
  }
  addCoupon(values: ICoupons): Observable<ICoupons> {
    return this.http
      .post<ApiResCoupon>(this.apiURL + '/' + 'save', { values })
      .pipe(
        map((res: ApiResCoupon) => {
          if (res && res.success) {
            const { data } = res;
            return data as ICoupons;
          } else {
            throw new Error('Error from server when call API!');
          }
        })
      );
  }
  updateCoupon(values: ICoupons): Observable<ICoupons> {
    return this.http
      .patch<ApiResCoupon>(this.apiURL + '/' + values._id, { values })
      .pipe(
        map((res: ApiResCoupon) => {
          if (res && res.success) {
            const { data } = res;
            return data as ICoupons;
          } else {
            throw new Error('Error from server when call API!');
          }
        })
      );
  }
  removeCoupon(id: string): Observable<ICoupons> {
    return this.http.delete<ApiResCoupon>(this.apiURL + '/' + id).pipe(
      map((res: ApiResCoupon) => {
        if (res && res.success) {
          const { data } = res;
          return data as ICoupons;
        } else {
          throw new Error('Error from server when call API!');
        }
      })
    );
  }
}
