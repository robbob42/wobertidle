import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnivalCardComponent } from './carnival-card.component';

describe('CarnivalCardComponent', () => {
  let component: CarnivalCardComponent;
  let fixture: ComponentFixture<CarnivalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnivalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnivalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
