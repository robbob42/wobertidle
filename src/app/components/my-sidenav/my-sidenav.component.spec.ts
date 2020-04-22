import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySidenavComponent } from './my-sidenav.component';

describe('MySidenavComponent', () => {
  let component: MySidenavComponent;
  let fixture: ComponentFixture<MySidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
