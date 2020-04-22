import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-accordion-activities',
  templateUrl: './accordion-activities.component.html',
  styleUrls: ['./accordion-activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionActivitiesComponent implements OnInit {

  constructor(public activityService: ActivityService) { }

  ngOnInit(): void {
  }

}
