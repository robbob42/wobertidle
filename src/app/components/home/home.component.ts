import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ControlService } from '../../services/control.service';
import { ImprovementService } from '../../services/improvement.service';
import { LevelService } from 'src/app/services/level.service';
import { ActivityService } from 'src/app/services/activity.service';

import initialItems from '../../../assets/items';
import initialActivities from '../../../assets/activities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public amounts = {
    1: 0,
    7: 0,
    3: 0,
    2: 0,
    8: 0,
  };
  public itemActivityMap: {
    itemId: number,
    activityId: number
  }[] = [];
  public testAvailable = false;

  constructor(
    public itemService: ItemService,
    public controlService: ControlService,
    public improvementService: ImprovementService,
    public levelService: LevelService,
    public activityService: ActivityService
  ) {
  }

  ngOnInit() {
    initialItems.forEach(item => {
      initialActivities.forEach(activity => {
        if (activity.producesId === item.id) {
          this.itemActivityMap.push({
            itemId: item.id,
            activityId: activity.id
          });
        }
      });
    });
  }

  cheat5() {
    this.itemService.incrementItem(900, 300);
    this.itemService.incrementItem(1, 20);
    this.itemService.incrementItem(2, 20);
    this.itemService.incrementItem(3, 20);
    this.itemService.incrementItem(7, 20);
    this.itemService.incrementItem(8, 20);
  }

  cheat20() {
    this.itemService.incrementItem(900, 2584);
    this.improvementService.forceSetLevel(7, 4);
    this.improvementService.forceSetLevel(10, 3);
    this.improvementService.forceSetLevel(9, 2);
    this.improvementService.forceSetLevel(8, 2);

    this.improvementService.forceSetLevel(1, 10);
    this.improvementService.forceSetLevel(12, 10);
    this.improvementService.forceSetLevel(3, 5);
    this.improvementService.forceSetLevel(2, 5);
    this.improvementService.forceSetLevel(13, 5);

    this.itemService.incrementItem(1, 100);
    this.itemService.incrementItem(2, 40);
    this.itemService.incrementItem(3, 10);
    this.itemService.incrementItem(7, 10);
  }

  setmcp(amt: number) {
    this.itemService.incrementItem(900, amt);
  }

  setAmount(itemId: number) {
    this.itemService.forceSetAmount(itemId, parseInt(this.amounts[itemId], 10));
  }

}
