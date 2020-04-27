import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Activity } from '../../models/activity';
import { ItemService } from '../../services/item.service';
import { Subscription, TimeoutError } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { BackgroundService } from 'src/app/services/background.service';

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
  public activityWidthNum = 0;
  public activityWidth = this.activityWidthNum.toString() + '%';
  public activityInterval: any;
  public widthInterval: any;

  private itemSub: Subscription;
  private humanItem: Item;

  private leftTime = 0;
  private returnTime = 0;

  private expected: number;
  private start = Date.now();
  private delta = 0;
  private calculateDeltaFlag = true;

  constructor(
    public itemService: ItemService,
    public activityService: ActivityService,
    private ref: ChangeDetectorRef,
    private backgroundService: BackgroundService
  ) {
    this.controlsSub = this.backgroundService.background$.subscribe((background) => {
      if (this.activity && this.activity.active){
        if (background) {
          this.leftTime = new Date().getTime() / 1000;
        }
        if (!background && this.leftTime) {
          this.returnTime = new Date().getTime() / 1000;
          const secondsGone = Math.floor(this.returnTime - this.leftTime);
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

      this.expected = this.start + this.activity.actionTime;
      this.calculateDeltaFlag = false;

      if (
        this.activity &&
        this.activity.active &&
        !this.itemService.limitReached(this.activity.producesId) &&
        this.itemService.amountAvailable(this.activity.decrementId, this.activity.decrementAmount) &&
        !this.activityInterval
      ) {
        this.setActivityInterval();
      }

      if (this.activity && !this.activity.active) {
        clearTimeout(this.activityInterval);
        clearInterval(this.widthInterval);
        this.activityInterval = null;
        this.widthInterval = null;
        this.activityWidthNum = 0;
        this.activityWidth = this.activityWidthNum.toString() + '%';
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
        clearTimeout(this.activityInterval);
        clearInterval(this.widthInterval);
        this.activityInterval = null;
        this.widthInterval = null;
        this.activityWidthNum = 0;
        this.activityWidth = this.activityWidthNum.toString() + '%';
      }
      if (this.activity && this.activity.active && !this.itemService.limitReached(this.activity.producesId)) {
        // TODO: Code in here for a change to items that allows activity to resume
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
    const interval = this.activity.actionTime;
    this.start = Date.now();
    this.expected = this.start + this.activity.actionTime;

    const increaseActivityWidth = () => {
      let curWidth = 0;
      this.widthInterval = setInterval(() => {
        curWidth += 1000 / this.activity.actionTime;
        this.activityWidthNum = curWidth;
        this.activityWidth = this.activityWidthNum.toString() + '%';
        this.ref.detectChanges();
      }, 10);
    };


    this.activityInterval = setTimeout(() => step(), this.activity.actionTime);
    clearInterval(this.widthInterval);
    increaseActivityWidth();

    const step = () => {
      if (this.activity && this.activity.active && !this.itemService.limitReached(this.activity.producesId)) {
        clearInterval(this.widthInterval);
        increaseActivityWidth();
        if (this.calculateDeltaFlag) {
          this.delta = Date.now() - this.expected; // the drift (positive for overshooting)
        } else {
          this.delta = 0;
          this.calculateDeltaFlag = true;
        }
        this.itemService.incrementItem(
          this.activity.producesId,
          this.activity.produceAmount,
          this.activity.decrementId,
          this.activity.decrementAmount,
          this.activity.mcProficiency
        );
        this.start = Date.now();
        this.expected = this.start + this.activity.actionTime - this.delta;
        this.activityInterval = setTimeout(() => step(), this.activity.actionTime - this.delta); // take into account drift
      }
    };
  }

  toggleActivity(activityId: number) {
    this.activityService.toggleActivity(activityId, this.humanItem.amount);
  }

  ngOnDestroy() {
    clearTimeout(this.activityInterval);
    clearInterval(this.widthInterval);
    this.activityInterval = null;
    this.widthInterval = null;
    this.activityWidthNum = 0;
    this.activityWidth = this.activityWidthNum.toString() + '%';

    this.activitySubscription.unsubscribe();
    this.itemSub.unsubscribe();
    this.controlsSub.unsubscribe();
  }
}
