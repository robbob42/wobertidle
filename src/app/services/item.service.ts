import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';
import items from '../../assets/items';
import { Improvement } from '../models/improvement';
import { Globals } from '../../assets/globals';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private sub = new BehaviorSubject<Item[]>([Globals.blankItem]);
  items$: Observable<Item[]> = this.sub.asObservable();
  private inventory: Item[] = [];

  constructor() { }

  initializeItems(dontResetIds = []) {
    const intializeInventory = [];
    items.forEach((inventoryItem) => {
      let pushItem =  JSON.parse(JSON.stringify(inventoryItem));
      dontResetIds.forEach((id) => {
        if (inventoryItem.id === id) {
          pushItem = JSON.parse(JSON.stringify(this.inventory.find(findItem => findItem.id === id)));
        }
      });
      intializeInventory.push(new Item(pushItem));
    });
    this.inventory = intializeInventory;
    this.sub.next(this.inventory);
  }

  incrementItem(itemId: number, amount: number, decrementId = 0, decrementAmt = 0, mcp = 0) {
    const incItem = this.inventory.find(item => item.id === itemId);
    incItem.amount += amount;
    if (mcp) {
      this.inventory.find(item => item.id === 900).amount += mcp;
    }
    if (incItem.limit && incItem.amount > incItem.limit) {
      incItem.amount = incItem.limit;
    }
    if (decrementId && decrementAmt) {
      this.inventory.find(item => item.id === decrementId).amount -= decrementAmt;
    }
    this.sub.next(this.inventory);
  }

  incrementItemWithoutEmit(itemId: number, amount: number, decrementId = 0, decrementAmt = 0, mcp = 0) {
    const incItem = this.inventory.find(item => item.id === itemId);
    incItem.amount += amount;
    if (mcp) {
      this.inventory.find(item => item.id === 900).amount += mcp;
    }
    if (incItem.limit && incItem.amount > incItem.limit) {
      incItem.amount = incItem.limit;
    }
    if (decrementId && decrementAmt) {
      this.inventory.find(item => item.id === decrementId).amount -= decrementAmt;
    }
  }

  forceEmit() {
    this.sub.next(this.inventory);
  }

  willCauseLimitReached(itemId: number, amount: number) {
    const incItem = this.inventory.find(item => item.id === itemId);
    return incItem.amount + amount >= incItem.limit;
  }

  forceSetAmount(itemId: number, amount: number, limit?: number) {
    this.inventory.find(item => item.id === itemId).amount = amount;
    if (limit) {
      this.inventory.find(item => item.id === itemId).limit = limit;
    }
    this.sub.next(this.inventory);
  }

  toggleVisible(visible: boolean, itemId: number) {
    this.inventory.find(item => item.id === itemId).visible = visible;
    this.sub.next(this.inventory);
  }

  sufficientFunds(itemId: number, amountCheck: number) {
    return this.inventory.find(invenItem => invenItem.id === itemId).amount >= amountCheck;
  }

  sell(itemId: number, percent: number) {
    const sellingItem = this.inventory.find(item => item.id === itemId);
    const sellingAmount = Math.floor(sellingItem.amount * percent / 100);
    const coinsItem = this.inventory.find(item => item.id === 902);

    if (sellingAmount > 0) {
      sellingItem.amount -= sellingAmount;
      coinsItem.amount += sellingItem.value * sellingAmount;

      this.sub.next(this.inventory);
    }
  }

  limitReached(itemId: number) {
    const item = this.inventory.find(invItem => invItem.id === itemId);
    return item.amount >= item.limit;
  }

  autoActivitySet() {
    return this.inventory.find(invItem => invItem.id === Globals.itemIds.autoActivitySwitcher).amount;
  }

  allowRefiningSet() {
    return this.inventory.find(invItem => invItem.id === Globals.itemIds.allowRefining).amount;
  }

  exchangeUnlocked() {
    return this.inventory.find(invItem => invItem.id === Globals.itemIds.exchangeUnlocked) ?
      this.inventory.find(invItem => invItem.id === Globals.itemIds.exchangeUnlocked).amount :
      false;
  }

  rebirthUnlocked() {
    return this.inventory.find(invItem => invItem.id === Globals.itemIds.rebirthUnlocked) ?
      this.inventory.find(invItem => invItem.id === Globals.itemIds.rebirthUnlocked).amount :
      false;
  }

  carnivalUnlocked() {
    return this.inventory.find(invItem => invItem.id === Globals.itemIds.carnivalUnlocked) ?
      this.inventory.find(invItem => invItem.id === Globals.itemIds.carnivalUnlocked).amount :
      false;
  }

  amountAvailable(itemId: number, amt: number) {
    if (!itemId) {
      return true;
    }
    const item = this.inventory.find(invItem => invItem.id === itemId);
    return item.amount >= amt;
  }

  buyItemImprovement(improvement: Improvement) {
    if (improvement.improvesByMultiplyer) {
      this.inventory.find(invItem => invItem.id === improvement.improveeId)[improvement.improves] *= improvement.improvesByMultiplyer;
    }
    if (improvement.improvesByAdder) {
      this.inventory.find(invItem => invItem.id === improvement.improveeId)[improvement.improves] += improvement.improvesByAdder;
    }

    this.sub.next(this.inventory);
  }

  saveEncrypt() {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    return simpleCrypto.encrypt(JSON.stringify(this.inventory));
  }

  loadDecrpyt(objKey: string) {
    const simpleCrypto = new SimpleCrypto(Globals.superSecretKey);
    const decrypted = simpleCrypto.decrypt(localStorage.getItem(objKey));
    this.inventory = JSON.parse(JSON.parse(JSON.stringify(decrypted)));
    this.sub.next(this.inventory);
  }
}
