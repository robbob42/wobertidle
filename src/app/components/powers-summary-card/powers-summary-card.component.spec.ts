import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowersSummaryCardComponent } from './powers-summary-card.component';

describe('PowersSummaryCardComponent', () => {
  let component: PowersSummaryCardComponent;
  let fixture: ComponentFixture<PowersSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowersSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowersSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
