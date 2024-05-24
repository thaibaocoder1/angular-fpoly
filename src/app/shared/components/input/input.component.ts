import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() htmlFor: string = '';
  constructor() {}
  ngOnInit(): void {}
}
