import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Modal title';
  @Input() large: boolean = false;
  @Input() modalId: string = 'removeItem';
  @Input() productId: string = '';
  @Input() isEdit: boolean = false;
  @Input() showButton: boolean = true;
  @Input() textButton: string = 'Save changes';
  @Output() confirm = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }
  onClick() {
    if (this.productId !== '') {
      this.confirm.emit(this.productId);
    }
  }
  ngOnDestroy(): void {
    this.el.nativeElement.remove();
    document.querySelector('.modal-backdrop')?.remove();
  }
}
