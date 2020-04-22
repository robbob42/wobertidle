import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionStatsComponent } from './accordion-stats.component';

describe('AccordionStatsComponent', () => {
  let component: AccordionStatsComponent;
  let fixture: ComponentFixture<AccordionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
