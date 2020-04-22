import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../models/activity';
import { Improvement } from '../models/improvement';
import activitySetup from '../../assets/activities';
import { Globals } from '../../assets/globals';
import { SimpleCrypto } from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private sub = new BehaviorSubject<Activity[]>([Globals.blankActivity]);
  activities$: Observable<Activity[]> = this.sub.asObservable();

  private activities: Activity[] = [];
  private autoCountdown = 5;

  constructor() { }

  toggleActivity(activityId: number, numOfHumans: number) {
    const activeHumans = this.activities.filter(act => act.active).length;
    let active: boolean;
    this.activities.forEach(activity => {
      if (activity.id === activityId && !activity.active && numOfHumans > activeHumans) {
        active = !activity.active;
      }
      if (activity.id === activityId && activity.active) {
        active = !activity.active;
      }
    });

    setTimeout(() => {
      this.activities.find(activity => activity.id === activityId).active = active;
      this.sub.next(this.activities);
    }, 1);
  }

  initializeActivities() {
    this.activities = [];
    activitySetup.forEach(activity => {
      this.activities.push(new Activity(activity));
    });
    this.sub.next(this.activities);
  }

  getActivities() {
    this.sub.next(this.activities);
  }

  toggleVisible(visible: boolean, activityId: number) {
    this.activities.find(activity => activity.id === activityId).visible = visible;
    this.sub.next(this.activities);
  }

  triggerActivity(activityId: number) {
    this.activities.find(activity => activity.id === activityId).triggered = true;
    this.sub.next(this.activities);
  }

  discoverActivity(activityId: number) {
    this.activities.find(activity => activity.id === activityId).discovered = true;
    this.sub.next(this.activities);
  }

  autoNextActivity(activityId: number) {
    let activitySetLoc: number;
    let activityLoc: number;
    for (let i = 0; i < Globals.activitySets.length - 1; i++) {
      for (let j = 0; j < Globals.activitySets[i].length; j++) {
        if (Globals.activitySets[i][j] === activityId) {
          activitySetLoc = i;
          activityLoc = j;
        }
      }
    }

    if (!isNaN(activitySetLoc) && !isNaN(activityLoc)) {
      if (this.autoCountdown >= 0) {
        if (activityLoc === Globals.activitySets[activitySetLoc].length - 1) {
          activityLoc = 0;
        }
        this.autoCountdown--;
        this.activities.find(act => act.id === Globals.activitySets[activitySetLoc][activityLoc + 1]).active = true;
      }
      this.activities.find(act => act.id === Globals.activitySets[activitySetLoc][activityLoc]).active = false;
      this.sub.next(this.activities);
    }
  }

  resetAutoCountdown() {
    this.autoCountdown = 5;
  }

  buyActivityImprovement(improvement: Improvement) {
    if (improvement.improvesByMultiplyer) {
      this.activities.find(act => act.id === improvement.improveeId)[improvement.improves] *= improvement.improvesByMultiplyer;
    }
    if (improvement.improvesByAdder) {
      this.activities.find(act => act.id === improvement.improveeId)[improvement.improves] += improvement.improvesByAdder;
    }
    this.sub.next(this.activities);
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.activities));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.activities = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.activities);
  }
}
