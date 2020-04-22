import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementCardComponent } from './improvement-card.component';

describe('ImprovementCardComponent', () => {
  let component: ImprovementCardComponent;
  let fixture: ComponentFixture<ImprovementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
