import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
import { Globals } from 'src/assets/globals';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  private sub = new BehaviorSubject<boolean>(false);
  background$: Observable<boolean> = this.sub.asObservable();

  private background = false;

  constructor() { }

  setBackground(active: boolean) {
    this.background = active;
    this.sub.next(this.background);
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.background));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.background = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.background);
  }
}
