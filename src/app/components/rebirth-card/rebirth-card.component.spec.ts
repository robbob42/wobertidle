import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebirthCardComponent } from './rebirth-card.component';

describe('RebirthCardComponent', () => {
  let component: RebirthCardComponent;
  let fixture: ComponentFixture<RebirthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebirthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebirthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
