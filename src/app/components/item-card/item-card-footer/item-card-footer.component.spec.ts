import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardFooterComponent } from './item-card-footer.component';

describe('ItemCardFooterComponent', () => {
  let component: ItemCardFooterComponent;
  let fixture: ComponentFixture<ItemCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
