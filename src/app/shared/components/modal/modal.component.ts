import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string = 'Modal title';
  @Input() modalId: string = 'removeItem';
  @Input() productId: string = '';
  @Input() isEdit: boolean = false;
  @Input() showButton: boolean = true;
  @Input() textButton: string = 'Save changes';
  @Output() confirm = new EventEmitter<string>();

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdit']) {
      document.addEventListener('click', (e: Event) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { edit: null },
            queryParamsHandling: 'merge',
          });
        }
      });
    }
  }
  onClick() {
    this.confirm.emit(this.productId);
  }
  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }
}
