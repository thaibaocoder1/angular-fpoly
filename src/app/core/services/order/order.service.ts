import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IOrders } from '../../models/order';
import { Observable, map } from 'rxjs';
import { ApiResponseOrder } from '../../adapter/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiURL = environment.API_URL + 'orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrders[]> {
    return this.http.get<ApiResponseOrder>(`${this.apiURL}`).pipe(
      map((res: ApiResponseOrder) => {
        if (res && res.success) {
          const { data } = res;
          return data as IOrders[];
        } else {
          throw new Error('Can not get data from CALL API!');
        }
      })
    );
  }
  getOrderWithId(id: string): Observable<IOrders[]> {
    return this.http.get<ApiResponseOrder>(`${this.apiURL}/order/${id}`).pipe(
      map((res: ApiResponseOrder) => {
        if (res && res.success) {
          const { data } = res;
          return data as IOrders[];
        } else {
          throw new Error('Can not get data from CALL API!');
        }
      })
    );
  }
  getOneOrder(orderId: string): Observable<IOrders> {
    return this.http.get<ApiResponseOrder>(`${this.apiURL}/${orderId}`).pipe(
      map((res: ApiResponseOrder) => {
        if (res && res.success) {
          const { data } = res;
          return data as IOrders;
        } else {
          throw new Error('Can not get data from CALL API!');
        }
      })
    );
  }
  updateOrder(status: number, orderId: string): Observable<IOrders> {
    return this.http
      .patch<ApiResponseOrder>(`${this.apiURL}/update-fields/${orderId}`, {
        status,
      })
      .pipe(
        map((res: ApiResponseOrder) => {
          if (res && res.success) {
            const { data } = res;
            return data as IOrders;
          } else {
            throw new Error('Can not get data from CALL API!');
          }
        })
      );
  }
  addOrder(values: IOrders): Observable<IOrders> {
    return this.http.post<ApiResponseOrder>(this.apiURL + '/save', values).pipe(
      map((res: ApiResponseOrder) => {
        if (res && res.success) {
          const { data } = res;
          return data as IOrders;
        } else {
          throw new Error('Can not get data from CALL API!');
        }
      })
    );
  }
  printInvoice(id: string): Observable<IOrders> {
    return this.http.get<ApiResponseOrder>(this.apiURL + '/invoice/' + id).pipe(
      map((res: ApiResponseOrder) => {
        if (res && res.success) {
          const { data } = res;
          return data as IOrders;
        } else {
          throw new Error('Can not get data from CALL API!');
        }
      })
    );
  }
}
