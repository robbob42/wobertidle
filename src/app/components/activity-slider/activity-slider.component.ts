import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Activity } from '../../models/activity';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.scss']
})
export class ActivitySliderComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activitySubscription: Subscription;

  public activity: Activity;

  public actionTime: string;
  public activityWidthNum = 0;
  public activityWidth = this.activityWidthNum.toString() + '%';
  public activityInterval: number;

  private itemSub: Subscription;
  private humanItem: Item;

  constructor(
    public itemService: ItemService,
    public activityService: ActivityService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activitySubscription = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
      this.actionTime = (this.activity.actionTime / 1000).toFixed(3);

      clearInterval(this.activityInterval);
      if (
        this.activity &&
        this.activity.active &&
        !this.itemService.limitReached(this.activity.producesId) &&
        this.itemService.amountAvailable(this.activity.decrementId, this.activity.decrementAmount)
      ) {
        this.setActivityInterval();
      }

      if (
        this.activity &&
        this.activity.active &&
        this.itemService.limitReached(this.activity.producesId) &&
        this.itemService.autoActivitySet()
      ) {
        this.activityService.autoNextActivity(this.activityId);
      }
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.humanItem = items.find((itm => itm.id === Globals.itemIds.human));

      if (this.itemService.limitReached(this.activity.producesId)) {
        clearInterval(this.activityInterval);
      }
      if (this.activity && this.activity.active && !this.itemService.limitReached(this.activity.producesId)) {
        this.setActivityInterval();
      }

      if (
        this.activity &&
        this.activity.active &&
        this.itemService.limitReached(this.activity.producesId) &&
        this.itemService.autoActivitySet()
      ) {
        this.activityService.autoNextActivity(this.activityId);
      }
    });
  }

  setActivityInterval() {
    clearInterval(this.activityInterval);
    this.activityInterval = window.setInterval(() => {
      this.activityWidthNum += 1000 / this.activity.actionTime;
      if (this.activityWidthNum >= 100) {
        this.activityWidthNum = 0;
        this.itemService.incrementItem(
          this.activity.producesId,
          this.activity.produceAmount,
          this.activity.decrementId,
          this.activity.decrementAmount,
          this.activity.mcProficiency
        );
        this.activityService.resetAutoCountdown();
      }
      this.activityWidth = this.activityWidthNum.toString() + '%';
      this.ref.detectChanges();
    }, 10);
  }

  toggleActivity(activityId: number) {
    this.activityService.toggleActivity(activityId, this.humanItem.amount);
  }

  ngOnDestroy() {
    this.activitySubscription.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
