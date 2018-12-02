import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddBulkComponent } from './user-add-bulk.component';

describe('UserAddBulkComponent', () => {
  let component: UserAddBulkComponent;
  let fixture: ComponentFixture<UserAddBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
