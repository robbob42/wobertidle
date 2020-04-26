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
  private activeColor: string;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--active-color: ${this.activeColor}`);
  }

  constructor(
    public activityService: ActivityService,
    private itemService: ItemService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find((act => act.id === this.activityId));
      this.activeColor = this.activity.color;
    });

    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.humanItem = items.find((itm => itm.id === Globals.itemIds.human));
    });
  }

  toggleActivity(activityId) {
    const worked = this.activityService.toggleActivity(activityId, this.humanItem.amount);
    if (!worked) {
      console.log('too many people!');
    }
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
