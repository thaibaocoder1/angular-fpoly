import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import Chart, { registerables } from 'chart.js/auto';
import {
  Subject,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from 'rxjs';

import { AppState } from '../../../app.state';
import * as OrderDetailActions from '../../../core/state/details/details.actions';

Chart.register(...registerables);
(Chart.defaults.font.family = 'Poppins'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

@Component({
  selector: 'app-chart-v1',
  templateUrl: './chart-v1.component.html',
  styleUrl: './chart-v1.component.css',
})
export class ChartV1Component implements OnInit, OnDestroy {
  canvas: any;
  ctx: any;
  monthlyRevenue: Array<number> = [];
  @ViewChild('myChart', { static: true }) myChart: ElementRef | undefined;
  private destroy$ = new Subject<void>();
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.getListOrder();
    this.renderData();
    this.canvas = this.myChart?.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }
  getListOrder() {
    this.store.dispatch(OrderDetailActions.GetOrderComplete());
  }
  renderData() {
    this.store
      .pipe(
        select((state) => state.details.loading),
        distinctUntilChanged(),
        filter((loading) => !loading),
        switchMap(() => this.store.select((state) => state.details.details)),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        for (let i = 1; i <= 12; i++) {
          const ordersInMonth = res.filter((order) => {
            const orderMonth =
              new Date(order.createdAt as string).getMonth() + 1;
            return orderMonth === i;
          });
          const totalRevenueInMonth = ordersInMonth.reduce(
            (total, order) => total + order.price * order.quantity,
            0
          );
          this.monthlyRevenue.push(totalRevenueInMonth);
        }
        let myChart = new Chart(this.ctx, {
          type: 'line',
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: [
              {
                label: 'Earnings',
                tension: 0.3,
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: 'rgba(78, 115, 223, 1)',
                pointRadius: 3,
                pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointBorderColor: 'rgba(78, 115, 223, 1)',
                pointHoverRadius: 3,
                pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
                pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: this.monthlyRevenue,
              },
            ],
          },
          options: {
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
