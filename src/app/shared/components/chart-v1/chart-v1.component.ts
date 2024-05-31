import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart, { registerables } from 'chart.js/auto';
Chart.register(...registerables);
(Chart.defaults.font.family = 'Poppins'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

@Component({
  selector: 'app-chart-v1',
  templateUrl: './chart-v1.component.html',
  styleUrl: './chart-v1.component.css',
})
export class ChartV1Component {
  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart: ElementRef | undefined;
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.canvas = this.myChart?.nativeElement;
    this.ctx = this.canvas.getContext('2d');
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
        datasets: [],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Start y-axis from zero
          },
        },
      },
    });
  }
}
