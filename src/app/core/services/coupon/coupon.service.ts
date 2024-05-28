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
          return data;
        }
      })
    );
  }
}
