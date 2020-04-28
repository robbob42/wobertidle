import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Globals } from 'src/assets/globals';

@Component({
  selector: 'app-item-card-text',
  templateUrl: './item-card-text.component.html',
  styleUrls: ['./item-card-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardTextComponent implements OnInit, OnDestroy {
  @Input() itemId: number;
  @Input() activityId: number;

  private itemSub: Subscription;
  public item: Item;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.item = items.find(itm => itm.id === this.itemId);
      this.mcpItem = items.find(itm => itm.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}
