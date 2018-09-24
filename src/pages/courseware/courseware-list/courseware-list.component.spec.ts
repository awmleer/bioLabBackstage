import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursewareListComponent } from './courseware-list.component';

describe('CoursewareListComponent', () => {
  let component: CoursewareListComponent;
  let fixture: ComponentFixture<CoursewareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursewareListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursewareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
