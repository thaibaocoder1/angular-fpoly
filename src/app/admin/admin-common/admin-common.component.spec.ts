import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommonComponent } from './admin-common.component';

describe('AdminCommonComponent', () => {
  let component: AdminCommonComponent;
  let fixture: ComponentFixture<AdminCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
