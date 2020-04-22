import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import initialItems from '../../../assets/items';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-activity-button',
  templateUrl: './activity-button.component.html',
  styleUrls: ['./activity-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slide
  ]
})
export class ActivityButtonComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activitySub: Subscription;
  public activity: Activity;

  public initialItems = initialItems;
  private itemSub: Subscription;
  private humanItem: Item;

  constructor(
    public activityService: ActivityService,
    private itemService: ItemService
  ) {
  }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find((act => act.id === this.activityId));
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.humanItem = items.find((itm => itm.id === Globals.itemIds.human));
    });
  }

  toggleActivity(activityId) {
    this.activityService.toggleActivity(activityId, this.humanItem.amount);
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
