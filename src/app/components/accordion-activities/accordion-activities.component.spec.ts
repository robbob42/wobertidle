import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionActivitiesComponent } from './accordion-activities.component';

describe('AccordionActivitiesComponent', () => {
  let component: AccordionActivitiesComponent;
  let fixture: ComponentFixture<AccordionActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
