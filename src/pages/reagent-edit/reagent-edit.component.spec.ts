import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentEditComponent } from './reagent-edit.component';

describe('ReagentEditComponent', () => {
  let component: ReagentEditComponent;
  let fixture: ComponentFixture<ReagentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
