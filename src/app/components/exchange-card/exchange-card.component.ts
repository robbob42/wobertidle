import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
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
  @Input() itemId: number;

  public initialItems = initialItems;
  public item: Item;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.item = items.find(item => item.id === this.itemId);
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
