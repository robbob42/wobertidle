import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { ImprovementService } from './improvement.service';

class Control {
  navigation: string;
  reset: number;
}
const defaultControl = {
  navigation: 'home',
  reset: 1
};

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private sub = new BehaviorSubject<Control>(defaultControl);
  controls$: Observable<Control> = this.sub.asObservable();

  private controls = defaultControl;

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private improvementService: ImprovementService
    ) { }

  navigate(nav: string) {
    this.controls.navigation = nav;
    this.sub.next(this.controls);
  }
}
