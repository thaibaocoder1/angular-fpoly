import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/models/category';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  @Input() htmlFor: string = '';
  @Input() label: string = '';
  @Input() state: Observable<ICategory[]> | undefined;
  constructor() {}
  ngOnInit(): void {}
}
