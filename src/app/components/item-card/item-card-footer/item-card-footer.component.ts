import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';
import initialItems from '../../../../assets/items';

@Component({
  selector: 'app-item-card-footer',
  templateUrl: './item-card-footer.component.html',
  styleUrls: ['./item-card-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardFooterComponent implements OnInit, OnDestroy {
  @Input() activityId: number;

  public activitySub: Subscription;
  public activity: Activity;
  public actionTime: string;
  public initialItems = initialItems;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
      this.actionTime = (this.activity.actionTime / 1000).toFixed(3) + 's';
    });
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
  }
}
