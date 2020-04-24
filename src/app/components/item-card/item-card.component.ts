import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../../assets/globals';
import { Item } from '../../models/item';
import { UtilsService } from '../../services/utils.service';
import initialItems from '../../../assets/items';
import { Activity } from 'src/app/models/activity';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent implements OnInit, OnDestroy {
  @Input() activityId: number;
  @Input() itemId: number;

  public initialItems = initialItems;
  private activitySub: Subscription;
  public activity: Activity;
  public item: Item;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;
  public actionTime: string;

  constructor(
    public activityService: ActivityService,
    public itemService: ItemService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
      this.actionTime = (this.activity.actionTime / 1000).toFixed(3);
    });
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.item = items.find(item => item.id === this.itemId);
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);

      if (this.activity && this.mcpItem) {
        if (this.mcpItem.amount === this.activity.mcpTriggerAmount && this.activity.trigger && !this.activity.triggered) {
          this.activityService.triggerActivity(this.activity.id);
        }
        if (this.mcpItem.amount >= this.activity.mcpDiscoverAmount && !this.activity.discovered) {
          this.activityService.discoverActivity(this.activity.id);
          this.item.visible = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemsSub.unsubscribe();
  }
}
