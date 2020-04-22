import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Level } from '../models/level';
import { Globals } from '../../assets/globals';
import initialLevels from '../../assets/levels';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { ImprovementService } from './improvement.service';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private sub = new BehaviorSubject<Level[]>([Globals.blankLevel]);
  levels$: Observable<Level[]> = this.sub.asObservable();
  private levels: Level[] = [];

  constructor(
    private injector: Injector,
    private itemService: ItemService,
    private activityService: ActivityService,
    private improvementService: ImprovementService
  ) { }

  initialize(dontResetIds = []) {
    const intializeAry = [];
    const initialItems = initialLevels;

    initialItems.forEach((initialItem) => {
      let pushItem = JSON.parse(JSON.stringify(initialItem));
      dontResetIds.forEach((id) => {
        if (initialItem.id === id) {
          pushItem = JSON.parse(JSON.stringify(this.levels.find(findItem => findItem.id === id)));
        }
      });
      intializeAry.push(new Level(pushItem));
    });
    this.levels = intializeAry;
    this.sub.next(this.levels);
  }

  levelUp() {
    const curLevel = this.levels.find((level) => level.current);
    const nextLevel = this.levels.find((level) => level.id === curLevel.id + 1);
    curLevel.current = false;
    nextLevel.current = true;
    this.sub.next(this.levels);
    this.resetGame(nextLevel.id);
  }

  resetGame(nextLevelId: number) {
    this.itemService.initializeItems([901, 904, 905, 906, 907]);
    this.activityService.initializeActivities();
    this.improvementService.initialize();

    for (let i = 1; i <= nextLevelId; i++) {
      const iterLevel = this.levels[i];
      iterLevel.improvements.forEach(improvementId => {
        this.improvementService.buyImprovement(improvementId, true);
      });
    }
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.levels));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.levels = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.levels);
  }
}
