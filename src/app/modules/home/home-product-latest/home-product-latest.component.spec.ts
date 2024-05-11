import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductLatestComponent } from './home-product-latest.component';

describe('HomeProductLatestComponent', () => {
  let component: HomeProductLatestComponent;
  let fixture: ComponentFixture<HomeProductLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductLatestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeProductLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
