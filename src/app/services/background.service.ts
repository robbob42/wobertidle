import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
import { Globals } from 'src/assets/globals';

export class Background {
  background: boolean;
  backgroundActivities: number[];
  localTime: number |  null;
  savedTime: number |  null;
}

const defaultBackground = {
  background: false,
  backgroundActivities: [],
  localTime: null,
  savedTime: null
};

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private sub = new BehaviorSubject<Background>(defaultBackground);
  background$: Observable<Background> = this.sub.asObservable();

  private background = defaultBackground;

  constructor() { }

  setAway() {
    this.background.background = true;
    this.background.localTime = new Date().getTime();
    this.sub.next(this.background);
  }

  setReturn() {
    this.background.background = false;
    this.sub.next(this.background);
  }

  pushToBackgroundActivities(activityId: number) {
    this.background.backgroundActivities.push(activityId);
    this.sub.next(this.background);
  }

  removeFromBackgroundActivities(activityId: number) {
    const index = this.background.backgroundActivities.indexOf(activityId);
    if (index > -1) {
      this.background.backgroundActivities.splice(index, 1);
    }
    this.sub.next(this.background);
  }

  setBackgroundActivities(activityIds: number[]) {
    this.background.backgroundActivities = activityIds;
    this.sub.next(this.background);
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    this.background.savedTime = new Date().getTime();
    return simpleCrypto.encrypt(JSON.stringify(this.background));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.background = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.background);
  }
}
