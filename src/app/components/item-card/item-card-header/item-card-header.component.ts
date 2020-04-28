import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-item-card-header',
  templateUrl: './item-card-header.component.html',
  styleUrls: ['./item-card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardHeaderComponent implements OnInit, OnDestroy {
  @Input() activityId: number;
  @Input() itemId: number;

  private activitySub: Subscription;
  public activity: Activity;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.activitySub = this.activityService.activities$.subscribe((activities) => {
      this.activity = activities.find(act => act.id === this.activityId);
    });
  }

  ngOnDestroy() {
    this.activitySub.unsubscribe();
  }
}
