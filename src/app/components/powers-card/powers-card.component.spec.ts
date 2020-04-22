import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowersCardComponent } from './powers-card.component';

describe('PowersCardComponent', () => {
  let component: PowersCardComponent;
  let fixture: ComponentFixture<PowersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowersCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
