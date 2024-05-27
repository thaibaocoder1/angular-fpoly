import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Province } from '../../../core/services/province/province.service';

@Component({
  selector: 'app-select-normal',
  templateUrl: './select-normal.component.html',
  styleUrl: './select-normal.component.css',
})
export class SelectNormalComponent implements OnInit {
  @Input() htmlFor: string = '';
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() state: Province[] | undefined;
  constructor() {}
  ngOnInit(): void {}
}
