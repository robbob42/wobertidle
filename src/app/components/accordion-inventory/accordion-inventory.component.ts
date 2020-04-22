import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemService } from '../../services/item.service';
import { UtilsService } from '../../services/utils.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-accordion-inventory',
  templateUrl: './accordion-inventory.component.html',
  styleUrls: ['./accordion-inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionInventoryComponent implements OnInit, OnDestroy {
  public Globals = Globals;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public moneyItem: Item;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
      this.moneyItem = items.find(item => item.id === Globals.itemIds.money);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
