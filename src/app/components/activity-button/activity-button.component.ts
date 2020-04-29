import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { slide } from './animations';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import initialItems from '../../../assets/items';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { Globals } from '../../../assets/globals';
import { ControlService } from 'src/app/services/control.service';
import { UtilsService } from 'src/app/services/utils.service';

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
  public bgColor = 'white';

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--active-color: ${this.activeColor}`);
  }

  constructor(
    public activityService: ActivityService,
    public itemService: ItemService,
    private sanitizer: DomSanitizer,
    private controlService: ControlService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find((act => act.id === this.activityId));
      const rgb = this.utilsService.hexToRgb(this.activity.color);
      const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
      this.bgColor = this.activity.active ? rgba : 'white';
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
        this.controlService.startRedPulse(activity.pulseId + 'card');
      });
    }
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
    this.itemSub.unsubscribe();
  }
}
