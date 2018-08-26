import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbsGroupComponent } from './bbs-group.component';

describe('BbsGroupComponent', () => {
  let component: BbsGroupComponent;
  let fixture: ComponentFixture<BbsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
