import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductArrivedComponent } from './home-product-arrived.component';

describe('HomeProductArrivedComponent', () => {
  let component: HomeProductArrivedComponent;
  let fixture: ComponentFixture<HomeProductArrivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductArrivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeProductArrivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
