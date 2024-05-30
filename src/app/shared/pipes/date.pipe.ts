import { Injectable, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DateFormatPipe implements PipeTransform {
  transform(timestamp: number, format: string = 'yyyy-MM-dd'): string {
    const date = new Date(timestamp);

    return new DatePipe('en-US').transform(date, format) || '';
  }
}
