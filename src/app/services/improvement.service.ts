import { Injectable } from '@angular/core';
import improvementSetup from '../../assets/improvements';
import { Improvement } from '../models/improvement';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import { Globals } from '../../assets/globals';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ImprovementService {
  private sub = new BehaviorSubject<Improvement[]>([Globals.blankImprovement]);
  improvements$: Observable<Improvement[]> = this.sub.asObservable();

  private improvements: Improvement[] = [];

  constructor(
    private itemService: ItemService,
    private activityService: ActivityService
    ) { }

  initialize(dontResetIds = []) {
    const intializeImprovements = [];
    improvementSetup.forEach((improvementItem) => {
      let pushImprovement = JSON.parse(JSON.stringify(improvementItem));
      dontResetIds.forEach((id) => {
        if (improvementItem.id === id) {
          pushImprovement = JSON.parse(JSON.stringify(this.improvements.find(findItem => findItem.id === id)));
        }
      });
      intializeImprovements.push(new Improvement(pushImprovement));
    });
    this.improvements = intializeImprovements;
    this.sub.next(this.improvements);
  }

  getImprovements() {
    this.sub.next(this.improvements);
  }

  forceSetLevel(improvementId: number, level: number) {
    const improvement = this.improvements.find(imp => imp.id === improvementId);
    for (let i = improvement.level; i < level; i++) {
      this.buyImprovement(improvementId, true);
    }
  }

  buyImprovement(improvementId: number, free: boolean = false) {
    const improvement = this.improvements.find(imp => imp.id === improvementId);
    let sufficientFunds = true;
    if (!free) {
      improvement.itemsCost.forEach(impCostItem => {
        if (!this.itemService.sufficientFunds(impCostItem.itemId, impCostItem.itemAmount)) {
          sufficientFunds = false;
        }
      });
    }

    if (sufficientFunds && (!improvement.levelMax || improvement.level < improvement.levelMax)) {
      improvement.itemsCost.forEach(impCostItem => {
        if (!free) {
          this.itemService.incrementItem(impCostItem.itemId, -impCostItem.itemAmount);
        }
        impCostItem.itemAmount = Math.round(impCostItem.itemAmount * improvement.costMultiplyer);
      });
      improvement.level++;
      this.sub.next(this.improvements);

      switch (improvement.improvee) {
        case 'activity':
          this.activityService.buyActivityImprovement(improvement);
          break;
        case 'item':
          this.itemService.buyItemImprovement(improvement);
          break;
        default:
          break;
      }
    }
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.improvements));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.improvements = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.improvements);
  }
}
