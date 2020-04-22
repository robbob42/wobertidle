import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item';
import items from '../../assets/items';
import { Improvement } from '../models/improvement';
import { Globals } from '../../assets/globals';

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
      let pushItem = {...inventoryItem};
      dontResetIds.forEach((id) => {
        if (inventoryItem.id === id) {
          pushItem = this.inventory.find(findItem => findItem.id === id);
        }
      });
      intializeInventory.push(new Item(pushItem));
    });
    this.inventory = intializeInventory;
    this.sub.next(this.inventory);
  }

  getItemInventory() {
    this.sub.next(this.inventory);
  }

  testHumans() {
    return this.inventory.find(finder => finder.id === 901).amount;
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
    return this.inventory.find(invItem => invItem.id === 904).amount;
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
}
