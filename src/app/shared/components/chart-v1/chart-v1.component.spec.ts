import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartV1Component } from './chart-v1.component';

describe('ChartV1Component', () => {
  let component: ChartV1Component;
  let fixture: ComponentFixture<ChartV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartV1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
