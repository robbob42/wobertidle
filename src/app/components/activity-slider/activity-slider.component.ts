import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Activity } from '../../models/activity';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivityService } from '../../services/activity.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { BackgroundService } from 'src/app/services/background.service';
import { ControlService } from 'src/app/services/control.service';
import { Background } from '../../services/background.service';
import { ImprovementService } from 'src/app/services/improvement.service';
import { Improvement } from 'src/app/models/improvement';

@Component({
  selector: 'app-activity-slider',
  templateUrl: './activity-slider.component.html',
  styleUrls: ['./activity-slider.component.scss']
})
export class ActivitySliderComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activity: Activity;

  public actionTime: string;

  private itemSub: Subscription;
  private humanItem: Item;

  private activityAfterBackgroundSub: Subscription;
  private backgrounds: Background;
  private backgroundActionsPerformed = false;
  private savedActionsPerformed = false;

  private improvementSub: Subscription;
  private autobuyImprovements: Improvement[] = [];

  constructor(
    public itemService: ItemService,
    public activityService: ActivityService,
    private backgroundService: BackgroundService,
    private controlService: ControlService,
    private improvementService: ImprovementService
  ) {
  }

  ngOnInit(): void {
    const activityAfterBackground = this.backgroundService.background$.pipe(
      switchMap((backgrounds) => {
        this.backgrounds = backgrounds;

        if (backgrounds.background) {
          this.backgroundActionsPerformed = false;
        }

        return this.activityService.activities$;
      })
    );
    this.activityAfterBackgroundSub = activityAfterBackground.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
      this.actionTime = (this.activity.actionTime / 1000).toFixed(3);

      // Perform background stuff if needed
      if (
        activities.length &&
        this.activity &&
        this.activity.active
      ){
        if (!this.savedActionsPerformed) {
          // This has to be done with a setTimeout to prevent ExpressionChangedAfterItHasBeenCheckedError
          setTimeout(() => {
            this.backgroundIncrement(this.activity, this.backgrounds.savedTime);
          });
          this.savedActionsPerformed = true;
        } else if (!this.backgrounds.background && !this.backgroundActionsPerformed) {
          setTimeout(() => {
            // This has to be done with a setTimeout to prevent ExpressionChangedAfterItHasBeenCheckedError
            this.backgroundIncrement(this.activity, this.backgrounds.localTime);
          });
        }
      } else if (activities.length && this.activity && !this.activity.active) {
        this.savedActionsPerformed = true;
        this.backgroundActionsPerformed = true;
      }

      // Go to next activity if needed
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
      this.activityService.resetAutoCountdown();
    });

    this.improvementSub = this.improvementService.improvements$.subscribe((improvements) => {
      this.autobuyImprovements = improvements.filter(
        imp => imp.autobuy && imp.itemsCost.find(itc => itc.itemId === this.activity.producesId)
      );
    });
  }

  backgroundIncrement(activity: Activity, time: number) {
    const returnTime = new Date().getTime();
    const secondsGone = Math.floor((returnTime / 1000) - (time / 1000));

    let incrementingActivity = activity;
    let incrementer = incrementingActivity.actionTime / 1000;

    // console.log('backgroundIncrement', secondsGone, activity, incrementer);
    for (let i = 0; i < secondsGone; i += incrementer) {
      if (
        incrementingActivity &&
        incrementingActivity.active &&
        !this.itemService.limitReached(incrementingActivity.producesId) &&
        this.itemService.amountAvailable(incrementingActivity.decrementId, incrementingActivity.decrementAmount)
      ) {
        console.log('incrementing', incrementingActivity.name, 'i is at', i, 'incrementer is at', incrementer);
        this.itemService.incrementItemWithoutEmit(
          incrementingActivity.producesId,
          incrementingActivity.produceAmount,
          incrementingActivity.decrementId,
          incrementingActivity.decrementAmount,
          incrementingActivity.mcProficiency
        );
      }
      if (
        incrementingActivity &&
        incrementingActivity.active &&
        this.itemService.willCauseLimitReached(incrementingActivity.producesId, incrementingActivity.produceAmount) &&
        this.itemService.autoActivitySet()
      ) {
        this.itemService.incrementItemWithoutEmit(
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
    this.itemService.forceEmit();

    this.backgroundActionsPerformed = true;
  }

  checkIncrement() {
    if (this.itemService.limitReached(this.activity.producesId)) {
      this.controlService.startRedPulse(`item-${this.activity.producesId}amount`);
      this.controlService.startRedPulse(`item-${this.activity.producesId}limit`);
    } else if (this.activity.decrementId && !this.itemService.sufficientFunds(this.activity.decrementId, this.activity.decrementAmount)) {
      this.controlService.startRedPulse(`item-${this.activity.decrementId}amount`);
    } else {
      this.itemService.incrementItem(
        this.activity.producesId,
        this.activity.produceAmount,
        this.activity.decrementId,
        this.activity.decrementAmount,
        this.activity.mcProficiency
      );
      setTimeout(() => {
        this.autobuyImprovements.forEach(improvement => {
          const insufficientIds = this.improvementService.buyImprovement(improvement.id);
          if (
            insufficientIds.length === 0  &&
            !this.activity.active &&
            improvement.itemsCost.find(itc => itc.itemId === this.activity.producesId)
          ) {
            this.toggleActivity(this.activityId);
          }
        });
      });
    }
  }

  toggleActivity(activityId: number) {
    this.activityService.toggleActivity(activityId, this.humanItem.amount);
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
    this.activityAfterBackgroundSub.unsubscribe();
    this.improvementSub.unsubscribe();
  }
}
