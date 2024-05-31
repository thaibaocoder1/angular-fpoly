import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTrashComponent } from './admin-user-trash.component';

describe('AdminUserTrashComponent', () => {
  let component: AdminUserTrashComponent;
  let fixture: ComponentFixture<AdminUserTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserTrashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
