import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { Globals } from '../../../../assets/globals';
import initialActivities from '../../../../assets/activities';
import { Activity } from 'src/app/models/activity';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-item-card-upcoming',
  templateUrl: './item-card-upcoming.component.html',
  styleUrls: ['./item-card-upcoming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardUpcomingComponent implements OnInit, OnDestroy {
  @Input() itemId: number;
  @Input() activityId: number;

  private itemSub: Subscription;
  public item: Item;
  public mcpItem: Item;
  public activity: Activity;

  constructor(
    public itemService: ItemService,
    public utilsService: UtilsService
    ) { }

  ngOnInit(): void {
    this.itemSub = this.itemService.items$.subscribe((items) => {
      this.item = items.find(itm => itm.id === this.itemId);
      this.mcpItem = items.find(item => item.id === Globals.itemIds.mcp);
    });

    this.activity = new Activity(initialActivities.find(act => act.id === this.activityId));
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}
