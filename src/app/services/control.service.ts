import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { ImprovementService } from './improvement.service';
import { LevelService } from './level.service';
import { RebirthService } from './rebirth.service';
import { Globals } from 'src/assets/globals';

class Control {
  gameNavigation: string;
  navigation: string;
  reset: number;
  foreground: boolean;
  pulser: {
    pulseId: string,
    pulsing: boolean,
    redPulse: boolean,
    initialPulse: boolean
  }[];
}
const defaultControl = {
  gameNavigation: 'play',
  navigation: 'home',
  reset: 1,
  foreground: true,
  pulser: [{
    pulseId: '',
    pulsing: false,
    redPulse: false,
    initialPulse: false
  }]
};

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private sub = new BehaviorSubject<Control>(defaultControl);
  controls$: Observable<Control> = this.sub.asObservable();

  private controls = defaultControl;

  constructor(
    private activityService: ActivityService,
    private improvementService: ImprovementService,
    private itemService: ItemService,
    private levelService: LevelService,
    private rebirthService: RebirthService,
    ) { }

  navigate(nav: string) {
    this.controls.navigation = nav;
    this.sub.next(this.controls);
  }

  gameNavigate(nav: string) {
    this.controls.gameNavigation = nav;
    this.sub.next(this.controls);
  }

  setForeground(active: boolean) {
    this.controls.foreground = active;
    this.sub.next(this.controls);
  }

  addPulser(pulseConfig: {
    pulseId: string,
    pulsing: boolean,
    redPulse: boolean,
    initialPulse: boolean
  }) {
    this.controls.pulser.push(pulseConfig);
    this.sub.next(this.controls);
  }

  endPulse(pulseId: string) {
    this.controls.pulser.find(pls => pls.pulseId === pulseId).pulsing = false;
    this.controls.pulser.find(pls => pls.pulseId === pulseId).redPulse = false;
    this.sub.next(this.controls);
  }

  startPulse(pulseId: string) {
    if (this.controls.pulser.find(pls => pls.pulseId === pulseId)) {
      this.controls.pulser.find(pls => pls.pulseId === pulseId).pulsing = true;
      this.sub.next(this.controls);
    }
  }

  startRedPulse(pulseId: string) {
    if (this.controls.pulser.find(pls => pls.pulseId === pulseId)) {
      this.controls.pulser.find(pls => pls.pulseId === pulseId).redPulse = true;
      this.sub.next(this.controls);
    }
  }

  save() {
    localStorage.setItem('wobertIdleSave', Globals.version);
    localStorage.setItem('wobertActivities', this.activityService.saveEncrypt());
    localStorage.setItem('wobertImprovements', this.improvementService.saveEncrypt());
    localStorage.setItem('wobertItems', this.itemService.saveEncrypt());
    localStorage.setItem('wobertLevels', this.levelService.saveEncrypt());
    localStorage.setItem('wobertRebirths', this.rebirthService.saveEncrypt());
  }

  load() {
    this.activityService.loadDecrpyt('wobertActivities');
    this.improvementService.loadDecrpyt('wobertImprovements');
    this.itemService.loadDecrpyt('wobertItems');
    this.levelService.loadDecrpyt('wobertLevels');
    this.rebirthService.loadDecrpyt('wobertRebirths');
  }

  clear() {
    localStorage.clear();
  }
}
