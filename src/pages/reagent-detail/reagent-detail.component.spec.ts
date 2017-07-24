import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentDetailComponent } from './reagent-detail.component';

describe('ReagentDetailComponent', () => {
  let component: ReagentDetailComponent;
  let fixture: ComponentFixture<ReagentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
