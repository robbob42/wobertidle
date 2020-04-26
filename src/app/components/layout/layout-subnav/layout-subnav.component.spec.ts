import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSubnavComponent } from './layout-subnav.component';

describe('LayoutSubnavComponent', () => {
  let component: LayoutSubnavComponent;
  let fixture: ComponentFixture<LayoutSubnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSubnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSubnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
