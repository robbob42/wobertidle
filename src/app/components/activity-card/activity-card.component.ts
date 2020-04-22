import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { ItemService } from '../../services/item.service';
import { Globals } from '../../../assets/globals';
import { Item } from '../../models/item';
import { UtilsService } from '../../services/utils.service';
import initialItems from '../../../assets/items';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent implements OnInit, OnDestroy {
  @Input() cardHeader: string;
  @Input() activityType: string;

  public initialItems = initialItems;
  public itemsSub: Subscription;
  public mcpItem: Item;
  public Globals = Globals;

  constructor(
    public activityService: ActivityService,
    public itemService: ItemService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.itemService.items$.subscribe((items) => {
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
