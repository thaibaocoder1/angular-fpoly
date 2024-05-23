import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
export interface IEmit {
  id: string;
  flag: boolean;
}

@Component({
  selector: 'app-modal-dynamic',
  templateUrl: './modal-dynamic.component.html',
  styleUrl: './modal-dynamic.component.css',
})
export class ModalDynamicComponent implements OnInit, OnDestroy {
  @Input() isShow: boolean = false;
  @Input() productId: string = '';
  @Output() confirmDynamic = new EventEmitter<IEmit>();

  @ViewChild('template', { static: true }) templateModal!:
    | TemplateRef<any>
    | string;
  modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService, private el: ElementRef) {}
  ngOnInit(): void {}

  confirm() {
    this.confirmDynamic.emit({
      id: this.productId,
      flag: false,
    });
    this.modalRef?.hide();
  }
  decline(): void {
    this.confirmDynamic.emit({
      id: this.productId,
      flag: true,
    });
    this.modalRef?.hide();
  }
  show() {
    this.isShow = true;
    this.modalRef = this.modalService.show(
      this.templateModal as TemplateRef<any>
    );
  }
  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }
}
