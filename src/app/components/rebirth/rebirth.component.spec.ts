import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebirthComponent } from './rebirth.component';

describe('RebirthComponent', () => {
  let component: RebirthComponent;
  let fixture: ComponentFixture<RebirthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebirthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
