import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionInventoryComponent } from './accordion-inventory.component';

describe('AccordionInventoryComponent', () => {
  let component: AccordionInventoryComponent;
  let fixture: ComponentFixture<AccordionInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
