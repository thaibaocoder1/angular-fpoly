import { CurrencyPipe } from '@angular/common';
import { Directive, ElementRef, Input } from '@angular/core';
import { IProducts } from '../../core/models/products';

@Directive({
  selector: '[appFormatV2]',
})
export class FormatV2Directive {
  constructor(private ref: ElementRef, private pipe: CurrencyPipe) {}
  @Input('appFormatV2') set format(item: IProducts) {
    const salePrice = (item.price * (100 - item.discount)) / 100;
    this.ref.nativeElement.textContent = this.pipe.transform(salePrice, 'VND');
  }
}
