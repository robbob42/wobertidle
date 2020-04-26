import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/models/item';
import { Globals } from 'src/assets/globals';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit, OnDestroy {
  @Input() activityId: number;
  @Input() itemId: number;

  private activitySub: Subscription;
  public activity: Activity;
  private itemSub: Subscription;
  public mcpItem: Item;

  constructor(
    public activityService: ActivityService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(itm => itm.id === Globals.itemIds.mcp);

      if (this.activity && this.mcpItem) {
        if (this.mcpItem.amount === this.activity.mcpTriggerAmount && this.activity.trigger && !this.activity.triggered) {
          this.activityService.triggerActivity(this.activity.id);
        }
        if (this.mcpItem.amount >= this.activity.mcpDiscoverAmount && !this.activity.discovered) {
          this.activityService.discoverActivity(this.activity.id);
        }
      }
    });
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
