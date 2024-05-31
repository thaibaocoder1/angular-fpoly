import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart, { registerables } from 'chart.js/auto';
Chart.register(...registerables);
(Chart.defaults.font.family = 'Poppins'),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

@Component({
  selector: 'app-chart-v2',
  templateUrl: './chart-v2.component.html',
  styleUrl: './chart-v2.component.css',
})
export class ChartV2Component implements AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('myPieChart') myPieChart: ElementRef | undefined;

  constructor() {}
  ngAfterViewInit(): void {
    this.canvas = this.myPieChart?.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    const myPieChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Canceled', 'Rejected'],
        datasets: [
          {
            data: [50, 30, 20],
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
  }
}
