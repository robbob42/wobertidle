import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import { UtilsService } from '../../services/utils.service';
import { ImprovementService } from '../../services/improvement.service';
import { Globals } from '../../../assets/globals';

@Component({
  selector: 'app-my-sidenav',
  templateUrl: './my-sidenav.component.html',
  styleUrls: ['./my-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySidenavComponent implements OnInit, OnDestroy {
  public activities: Activity[];
  public inventory: Item[];
  public inventoryOpen = false;
  public statsOpen = false;
  public inventoryVisible = false;
  public improvementsVisible = false;
  public activitiesOpen = true;
  public activitiesDisabled = false;
  public mcpItem: Item;
  public humanItem: Item;
  public coinsItem: Item;

  public moneyImprovementsVisible = false;
  public moneyImprovementsAmt = Globals.visibleAmounts.money;

  public subscriptions: Subscription[] = [];

  constructor(
    private itemService: ItemService,
    public activityService: ActivityService,
    private improvementService: ImprovementService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.activityService.getActivities();
    this.improvementService.getImprovements();
    setTimeout(() => {
      this.activityService.activities$.subscribe((activities) => {
        this.activities = activities;
      });
      this.subscriptions.push(this.itemService.items$.subscribe((items) => {
        this.inventoryVisible = false;
        items.forEach(item => {
          if (item.visible) {
            this.inventoryVisible = true;
            this.inventoryOpen = true;
            this.activitiesOpen = true;
            this.activitiesDisabled = true;
            this.statsOpen = true;
          }
          if (item.id === 900) {
            this.mcpItem = item;
            this.moneyImprovementsVisible = item.amount >= this.moneyImprovementsAmt;
            if (item.amount > 49) {
              this.improvementsVisible = true;
            }
          }
          if (item.id === 901) {
            this.humanItem = item;
          }
          if (item.id === 902) {
            this.coinsItem = item;
          }
        });
        this.inventory = items;

        if (this.activities && this.mcpItem) {
          this.activities.forEach(activity => {
            if (this.mcpItem.amount === activity.mcpTriggerAmount && activity.trigger && !activity.triggered) {
              this.activityService.triggerActivity(activity.id);
            }
            if (this.mcpItem.amount >= activity.mcpDiscoverAmount && !activity.discovered) {
              this.activityService.discoverActivity(activity.id);
              this.inventory.find(item => item.name === activity.produces).visible = true;
            }
          });
        }
      }));
    });
  }

  formatCurrency(amt: number) {
    return this.utilsService.formatCurrency(amt);
  }

  toggleAccordion(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
