import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import Chart, { registerables } from 'chart.js/auto';
import { AppState } from '../../../app.state';
import * as OrderActions from '../../../core/state/order/order.actions';
import { distinctUntilChanged, filter, switchMap, take } from 'rxjs';

Chart.register(...registerables);
(Chart.defaults.font.family = 'Poppins'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

@Component({
  selector: 'app-chart-v2',
  templateUrl: './chart-v2.component.html',
  styleUrl: './chart-v2.component.css',
})
export class ChartV2Component implements OnInit {
  canvas: any;
  ctx: any;
  statusCounts: Array<number> = [];
  @ViewChild('myPieChart', { static: true }) myPieChart: ElementRef | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.canvas = this.myPieChart?.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.getAllOrders();
    this.renderData();
  }
  renderData() {
    let countStatus3 = 0;
    let countStatus4 = 0;
    let countStatus5 = 0;
    this.store
      .pipe(
        select((state) => state.orders.loading),
        distinctUntilChanged(),
        filter((loading) => !loading),
        switchMap(() => this.store.select((state) => state.orders.orders)),
        take(1)
      )
      .subscribe((data) => {
        data.forEach((item) => {
          switch (item.status) {
            case 3:
              countStatus3++;
              break;
            case 4:
              countStatus4++;
              break;
            case 5:
              countStatus5++;
              break;
            default:
              break;
          }
        });
        this.statusCounts = [countStatus3, countStatus4, countStatus5];
        const myPieChart = new Chart(this.ctx, {
          type: 'doughnut',
          data: {
            labels: ['Success', 'Canceled', 'Rejected'],
            datasets: [
              {
                data: this.statusCounts,
                backgroundColor: ['#4e73df', '#dc3545', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#dc3520', '#2c9faf'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)',
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                backgroundColor: 'rgb(255,255,255)',
                bodyColor: '#858796',
                borderColor: '#dddfeb',
                borderWidth: 1,
                padding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label || '';
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
            cutout: 80,
          },
        });
      });
  }

  getAllOrders() {
    this.store.dispatch(OrderActions.GetOrder());
  }
}
