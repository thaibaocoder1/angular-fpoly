import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../core/models/category';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  @Input() htmlFor: string = '';
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() state: Observable<ICategory[]> | undefined;
  constructor() {}
  ngOnInit(): void {}
}
