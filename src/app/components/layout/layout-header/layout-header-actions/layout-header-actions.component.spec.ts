import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutHeaderActionsComponent } from './layout-header-actions.component';

describe('LayoutHeaderActionsComponent', () => {
  let component: LayoutHeaderActionsComponent;
  let fixture: ComponentFixture<LayoutHeaderActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutHeaderActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutHeaderActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
