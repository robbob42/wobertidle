import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardHeaderComponent } from './item-card-header.component';

describe('ItemCardHeaderComponent', () => {
  let component: ItemCardHeaderComponent;
  let fixture: ComponentFixture<ItemCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
