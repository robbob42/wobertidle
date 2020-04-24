import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../../assets/globals';
import { Item } from '../../models/item';
import { UtilsService } from '../../services/utils.service';
import initialItems from '../../../assets/items';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public initialItems = initialItems;
  private activitySub: Subscription;
  public activity: Activity;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public activityService: ActivityService,
    public itemService: ItemService,
    public utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
    });
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemsSub.unsubscribe();
  }
}
