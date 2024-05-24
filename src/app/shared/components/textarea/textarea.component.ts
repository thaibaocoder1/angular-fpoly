import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
})
export class TextareaComponent implements OnInit {
  @Input() htmlFor: string = '';
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  constructor() {}
  ngOnInit(): void {}
}
