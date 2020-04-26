import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardUpcomingComponent } from './item-card-upcoming.component';

describe('ItemCardUpcomingComponent', () => {
  let component: ItemCardUpcomingComponent;
  let fixture: ComponentFixture<ItemCardUpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardUpcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
