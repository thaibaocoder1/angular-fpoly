import { Directive, ElementRef, Input } from '@angular/core';
import { IProducts } from '../../core/models/products';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appFormat]',
  providers: [CurrencyPipe],
})
export class FormatDirective {
  constructor(private ref: ElementRef, private pipe: CurrencyPipe) {}
  @Input('appFormat') set format(item: IProducts) {
    const salePrice = (item.price * (100 - item.discount)) / 100;
    this.ref.nativeElement.textContent = this.pipe.transform(salePrice, 'VND');
  }
}
