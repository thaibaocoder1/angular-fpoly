import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Province } from '../../../core/services/province/province.service';

@Component({
  selector: 'app-select-normal',
  templateUrl: './select-normal.component.html',
  styleUrl: './select-normal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectNormalComponent implements OnInit {
  @Input() htmlFor: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() status: number = 1;
  @Input() control: FormControl = new FormControl();
  @Input() state: Province[] | any[] | undefined;
  constructor() {}
  ngOnInit(): void {}
  trackByFn(index: number, item: any): number {
    return index;
  }
  checkDisabled(i: number) {
    switch (this.status) {
      case 2:
        if (i !== 1 && i !== 4 && i !== 2) {
          return true;
        }
        break;
      case 3:
        if (i !== 2) {
          return true;
        }
        break;
      case 4:
        if (i !== 3) {
          return true;
        }
        break;
      case 5:
        if (i !== 4) {
          return true;
        }
        break;
      default:
        return i === 4 || i === 2;
    }
    return false;
  }
}
