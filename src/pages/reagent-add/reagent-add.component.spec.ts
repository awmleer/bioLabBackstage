import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagentAddComponent } from './reagent-add.component';

describe('ReagentAddComponent', () => {
  let component: ReagentAddComponent;
  let fixture: ComponentFixture<ReagentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
