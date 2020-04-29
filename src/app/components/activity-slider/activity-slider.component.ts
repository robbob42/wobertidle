import { Component, OnInit, Input, OnDestroy, HostBinding } from '@angular/core';
import { Activity } from '../../models/activity';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { BackgroundService } from 'src/app/services/background.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.scss']
})
export class ActivitySliderComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activitySubscription: Subscription;
  private controlsSub: Subscription;

  public activity: Activity;

  public actionTime: string;

  private itemSub: Subscription;
  private humanItem: Item;

  private leftTime = 0;
  private returnTime = 0;

  constructor(
    public itemService: ItemService,
    public activityService: ActivityService,
    private backgroundService: BackgroundService,
    private controlService: ControlService
  ) {
    this.controlsSub = this.backgroundService.background$.subscribe((background) => {
      if (this.activity && this.activity.active){
        if (background) {
          this.leftTime = new Date().getTime() / 1000;
          console.log('left at', this.leftTime);
        }
        console.log(background, this.leftTime);
        if (!background && this.leftTime) {
          this.returnTime = new Date().getTime() / 1000;
          const secondsGone = Math.floor(this.returnTime - this.leftTime);
          console.log('returned, gone for', secondsGone);
          let incrementingActivity = this.activity;
          let incrementer = incrementingActivity.actionTime / 1000;
          // const itemsReceived = Math.floor((this.returnTime - this.leftTime) / this.activity.actionTime * 1000);
          // console.log(
          //   'left: ', this.leftTime, ' returned: ', this.returnTime, ' time gone: ',
          //   this.returnTime - this.leftTime, ' adding: ', itemsReceived
          // );

          for (let i = 0; i < secondsGone; i += incrementer) {
            if (
              incrementingActivity &&
              incrementingActivity.active &&
              !this.itemService.limitReached(incrementingActivity.producesId) &&
              this.itemService.amountAvailable(incrementingActivity.decrementId, incrementingActivity.decrementAmount)
            ) {
              this.itemService.incrementItem(
                incrementingActivity.producesId,
                incrementingActivity.produceAmount,
                incrementingActivity.decrementId,
                incrementingActivity.decrementAmount,
                incrementingActivity.mcProficiency
              );
            }
// console.log(
//   incrementingActivity,
//   incrementingActivity.active,
//   this.itemService.willCauseLimitReached(incrementingActivity.producesId, incrementingActivity.produceAmount),
//   this.itemService.autoActivitySet()
// );
            if (
              incrementingActivity &&
              incrementingActivity.active &&
              this.itemService.willCauseLimitReached(incrementingActivity.producesId, incrementingActivity.produceAmount) &&
              this.itemService.autoActivitySet()
            ) {
              this.itemService.incrementItem(
                incrementingActivity.producesId,
                incrementingActivity.produceAmount,
                incrementingActivity.decrementId,
                incrementingActivity.decrementAmount,
                incrementingActivity.mcProficiency
              );
              i += incrementer;
              incrementingActivity.active = false;
              incrementingActivity = this.activityService.getNextActivity(incrementingActivity.id);
              incrementingActivity.active = true;
              incrementer = incrementingActivity.actionTime / 1000;
            }
          }

          this.leftTime = 0;
          this.returnTime = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.activitySubscription = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
      this.actionTime = (this.activity.actionTime / 1000).toFixed(3);

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

  checkIncrement() {
    if (this.itemService.limitReached(this.activity.producesId)) {
      this.controlService.startRedPulse(`item-${this.activity.producesId}amount`);
      this.controlService.startRedPulse(`item-${this.activity.producesId}limit`);
    } else {
      this.itemService.incrementItem(
        this.activity.producesId,
        this.activity.produceAmount,
        this.activity.decrementId,
        this.activity.decrementAmount,
        this.activity.mcProficiency
      );
    }
  }

  toggleActivity(activityId: number) {
    this.activityService.toggleActivity(activityId, this.humanItem.amount);
  }

  ngOnDestroy() {
    this.activitySubscription.unsubscribe();
    this.itemSub.unsubscribe();
    this.controlsSub.unsubscribe();
  }
}
