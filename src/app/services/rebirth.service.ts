import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Level } from '../models/level';
import { Globals } from '../../assets/globals';
import initialRebirths from '../../assets/rebirths';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { ImprovementService } from './improvement.service';
import { LevelService } from './level.service';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RebirthService {
  private sub = new BehaviorSubject<Level[]>([Globals.blankLevel]);
  rebirths$: Observable<Level[]> = this.sub.asObservable();
  private rebirths: Level[] = [];

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService,
    private improvementService: ImprovementService,
    private levelService: LevelService
  ) { }

  initialize(dontResetIds = []) {
    const intializeAry = [];
    const initialItems = initialRebirths;

    initialItems.forEach((initialItem) => {
      let pushItem = JSON.parse(JSON.stringify(initialItem));
      dontResetIds.forEach((id) => {
        if (initialItem.id === id) {
          pushItem = JSON.parse(JSON.stringify(this.rebirths.find(findItem => findItem.id === id)));
        }
      });
      intializeAry.push(new Level(pushItem));
    });
    this.rebirths = intializeAry;
    this.sub.next(this.rebirths);
  }

  rebirth() {
    const curRebirth = this.rebirths.find((rebirth) => rebirth.current);
    const nextRebirth = this.rebirths.find((rebirth) => rebirth.id === curRebirth.id + 1);
    curRebirth.current = false;
    nextRebirth.current = true;
    this.sub.next(this.rebirths);
    this.resetRebirth(nextRebirth.id);
  }

  resetRebirth(nextRebirthId: number) {
    this.itemService.initializeItems([901]);
    this.activityService.initializeActivities();
    this.improvementService.initialize();
    this.levelService.initialize();

    for (let i = 1; i <= nextRebirthId; i++) {
      const iterLevel = this.rebirths[i];
      iterLevel.improvements.forEach(improvementId => {
        this.improvementService.buyImprovement(improvementId, true);
      });
    }
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.rebirths));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.rebirths = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.rebirths);
  }
}
