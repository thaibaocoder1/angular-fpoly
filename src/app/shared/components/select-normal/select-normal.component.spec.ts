import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNormalComponent } from './select-normal.component';

describe('SelectNormalComponent', () => {
  let component: SelectNormalComponent;
  let fixture: ComponentFixture<SelectNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectNormalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
