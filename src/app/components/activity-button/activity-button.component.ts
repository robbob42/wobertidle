import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import initialItems from '../../../assets/items';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlService } from 'src/app/services/control.service';

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
  @Input() itemId: number;

  private activitySub: Subscription;
  public activity: Activity;

  public initialItems = initialItems;
  private itemSub: Subscription;
  private humanItem: Item;
  public item: Item;
  private activeColor: string;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--active-color: ${this.activeColor}`);
  }

  constructor(
    public activityService: ActivityService,
    public itemService: ItemService,
    private sanitizer: DomSanitizer,
    private controlService: ControlService
  ) {
  }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find((act => act.id === this.activityId));
      this.activeColor = this.activity.color;
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.item = items.find(itm => itm.id === this.itemId);
      this.humanItem = items.find((itm => itm.id === Globals.itemIds.human));
    });
  }

  toggleActivity(activityId: number) {
    const toggleResults = this.activityService.toggleActivity(activityId, this.humanItem.amount);
    if (!toggleResults.toggled) {
      toggleResults.actives.forEach(activity => {
        this.controlService.startRedPulse(activity.pulseId + 'name');
      });
    }
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
