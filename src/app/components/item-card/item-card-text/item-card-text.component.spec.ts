import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardTextComponent } from './item-card-text.component';

describe('ItemCardTextComponent', () => {
  let component: ItemCardTextComponent;
  let fixture: ComponentFixture<ItemCardTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
