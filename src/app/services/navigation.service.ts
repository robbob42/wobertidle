import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
import { Globals } from 'src/assets/globals';

class Navigation {
  topNav: string;
  contentNav: string;
}

const defaultNavigation = {
  topNav: 'welcome',
  contentNav: 'home'
};

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private sub = new BehaviorSubject<Navigation>(defaultNavigation);
  navigations$: Observable<Navigation> = this.sub.asObservable();

  private navigation = defaultNavigation;

  constructor() { }

  topNavigate(nav: string) {
    this.navigation.topNav = nav;
    this.sub.next(this.navigation);
  }

  contentNavigate(nav: string) {
    this.navigation.contentNav = nav;
    this.sub.next(this.navigation);
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.navigation));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.navigation = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.navigation);
  }
}
