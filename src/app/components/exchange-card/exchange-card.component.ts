import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '../../../assets/globals';
import { ItemService } from '../../services/item.service';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import initialItems from '../../../assets/items';

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeCardComponent implements OnInit, OnDestroy {
  public initialItems = initialItems;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
