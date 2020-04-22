import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulsingTextComponent } from './pulsing-text.component';

describe('PulsingTextComponent', () => {
  let component: PulsingTextComponent;
  let fixture: ComponentFixture<PulsingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulsingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulsingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
